'use client';

import { useState, useEffect, useRef } from 'react';

interface Card {
  id: number;
  content: string;
  flipped: boolean;
  matched: boolean;
}

enum GameState {
  Welcome,
  Playing,
  Complete
}

const MemoryGame = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [gameState, setGameState] = useState<GameState>(GameState.Welcome);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [gameStartTime, setGameStartTime] = useState<number>(0);
  const [gameTime, setGameTime] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showInstructions, setShowInstructions] = useState<boolean>(false);

  // Card emojis for matching pairs
  const cardContents = ['🚀', '🌟', '🎮', '💻', '🤖', '🦄', '🎨', '🔮'];

  // Calculate score based on moves and time
  const calculateScore = (matchCount: number, moveCount: number, timeInSeconds: number) => {
    // Base points per match
    const basePointsPerMatch = 200;
    
    // Time penalty - reduces points per match as time increases
    // After 60 seconds, each match is worth 50% less
    const timeMultiplier = Math.max(0.2, 1 - (timeInSeconds / 120));
    
    // Calculate score - each match gives points, but value decreases with time
    let totalScore = 0;
    for (let i = 0; i < matchCount; i++) {
      // Each match gives slightly fewer points than the previous one
      const matchPoints = Math.round(basePointsPerMatch * timeMultiplier * (1 - (i * 0.05)));
      totalScore += matchPoints;
    }
    
    // Move penalty - reduce score for excessive moves
    const movePenalty = Math.max(0, (moveCount - matchCount) * 25);
    
    // Calculate final score
    const finalScore = Math.max(0, totalScore - movePenalty);
    
    return Math.round(finalScore);
  };

  // Initialize game
  const initializeGame = () => {
    // Create pairs of cards
    const newCards = [...cardContents, ...cardContents].map((content, index) => ({
      id: index,
      content,
      flipped: false,
      matched: false
    }));

    // Shuffle cards
    for (let i = newCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newCards[i], newCards[j]] = [newCards[j], newCards[i]];
    }

    // Reset all game state variables
    setCards(newCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setGameTime(0);
    setScore(0);
    setGameState(GameState.Playing);
    
    // Set start time and start timer
    const startTime = Date.now();
    setGameStartTime(startTime);
    
    // Clear any existing timer
    if (timerRef.current) clearInterval(timerRef.current);
    
    // Start a new timer that properly calculates elapsed time from now
    timerRef.current = setInterval(() => {
      setGameTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
  };

  // Handle card click
  const handleCardClick = (id: number) => {
    // Ignore if game not in playing state
    if (gameState !== GameState.Playing) return;
    
    // Ignore if card is already flipped or matched
    const clickedCard = cards.find(card => card.id === id);
    if (!clickedCard || clickedCard.flipped || clickedCard.matched) return;
    
    // Ignore if already two cards flipped
    if (flippedCards.length === 2) return;
    
    // Flip the card
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === id ? { ...card, flipped: true } : card
      )
    );
    
    // Add to flipped cards
    setFlippedCards(prev => [...prev, id]);
  };

  // Check for matches when two cards are flipped
  useEffect(() => {
    if (flippedCards.length === 2) {
      // Increment moves
      setMoves(prev => prev + 1);
      
      // Get the cards
      const [first, second] = flippedCards;
      const firstCard = cards.find(card => card.id === first);
      const secondCard = cards.find(card => card.id === second);
      
      // Check if they match
      if (firstCard && secondCard && firstCard.content === secondCard.content) {
        // Mark as matched
        setCards(prevCards =>
          prevCards.map(card =>
            card.id === first || card.id === second
              ? { ...card, matched: true }
              : card
          )
        );
        
        // Increment matched pairs count
        setMatchedPairs(prev => prev + 1);
        
        // Reset flipped cards
        setFlippedCards([]);
      } else {
        // Not a match, flip back after delay
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              card.id === first || card.id === second
                ? { ...card, flipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 800);
      }
    }
  }, [flippedCards, cards]);

  // Check for game completion
  useEffect(() => {
    if (matchedPairs === cardContents.length && gameState === GameState.Playing) {
      // Game complete
      setGameState(GameState.Complete);
      
      // Stop timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      // Calculate final score
      const finalScore = calculateScore(cardContents.length, moves, gameTime);
      setScore(finalScore);
      
      // Save best score
      const currentScore = moves;
      const storedBestScore = localStorage.getItem('memoryGameBestScore');
      const currentBestScore = storedBestScore ? parseInt(storedBestScore) : null;
      
      if (!currentBestScore || currentScore < currentBestScore) {
        localStorage.setItem('memoryGameBestScore', currentScore.toString());
        setBestScore(currentScore);
      } else {
        setBestScore(currentBestScore);
      }
      
      // Save best time
      const storedBestTime = localStorage.getItem('memoryGameBestTime');
      const currentBestTime = storedBestTime ? parseInt(storedBestTime) : null;
      
      if (!currentBestTime || gameTime < currentBestTime) {
        localStorage.setItem('memoryGameBestTime', gameTime.toString());
        setBestTime(gameTime);
      } else {
        setBestTime(currentBestTime);
      }
    }
  }, [matchedPairs, cardContents.length, gameState, moves, gameTime]);

  // Load best score and time on component mount
  useEffect(() => {
    const storedBestScore = localStorage.getItem('memoryGameBestScore');
    if (storedBestScore) {
      setBestScore(parseInt(storedBestScore));
    }
    
    const storedBestTime = localStorage.getItem('memoryGameBestTime');
    if (storedBestTime) {
      setBestTime(parseInt(storedBestTime));
    }
    
    return () => {
      // Cleanup timer on unmount
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    // Ensure we're not displaying huge numbers as shown in the screenshot
    if (seconds > 3600) seconds = 0;
    
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Toggle instructions
  const toggleInstructions = () => {
    setShowInstructions(prev => !prev);
  };

  return (
    <div className="flex flex-col h-full w-full items-center justify-center bg-gradient-to-b from-black/50 to-black/30 rounded-lg overflow-hidden p-2">
      {gameState === GameState.Welcome && (
        <div className="text-center p-6 max-w-xs mx-auto">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white mb-3">Bored while waiting?</h3>
            <p className="text-white/70 mb-4">Want to play a quick memory game?</p>
            
            {/* Instructions Button */}
            <button 
              onClick={toggleInstructions}
              className="text-white/60 hover:text-white text-sm mb-4 underline"
            >
              {showInstructions ? "Hide Instructions" : "How to Play"}
            </button>
            
            {/* Game Instructions - Made to fill the game box instead of fullscreen */}
            {showInstructions && (
              <div className="absolute inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
                <div className="bg-bg-darker p-6 rounded-xl border border-accent/20 max-w-md w-full">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold text-xl text-white">Game Instructions</h4>
                    <button 
                      onClick={toggleInstructions}
                      className="p-1.5 bg-black/30 rounded-full text-white/70 hover:text-white"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <ul className="list-disc pl-5 space-y-3 text-white/90">
                    <li>Match pairs of identical icons as quickly as possible</li>
                    <li>Click cards to flip them over</li>
                    <li>Remember the locations to make matches efficiently</li>
                    <li>The game is scored based on speed and number of moves</li>
                    <li>Fewer moves and faster completion = higher score</li>
                  </ul>
                  <button 
                    onClick={toggleInstructions}
                    className="mt-6 w-full py-2.5 bg-accent hover:bg-accent-hover text-white rounded-lg"
                  >
                    Got it
                  </button>
                </div>
              </div>
            )}
          </div>
          <button 
            onClick={initializeGame}
            className="px-6 py-3 bg-accent hover:bg-accent-hover text-white rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 w-full"
          >
            Let's Play!
          </button>
          {(bestScore !== null || bestTime !== null) && (
            <div className="mt-4 text-sm text-white/60 flex flex-col space-y-1">
              {bestScore !== null && (
                <p>Best score: {bestScore} moves</p>
              )}
              {bestTime !== null && (
                <p>Best time: {formatTime(bestTime)}</p>
              )}
            </div>
          )}
        </div>
      )}

      {gameState === GameState.Playing && (
        <div className="w-full max-w-md mx-auto p-2">
          <div className="flex justify-between items-center mb-4">
            <div className="text-white">
              <span className="text-xs text-white/60">Moves:</span>
              <span className="ml-1 font-bold">{moves}</span>
            </div>
            <div className="text-white">
              <span className="text-xs text-white/60">Time:</span>
              <span className="ml-1 font-bold">{formatTime(gameTime)}</span>
            </div>
            <button 
              onClick={() => setGameState(GameState.Welcome)}
              className="text-white/60 hover:text-white text-xs px-2 py-1 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
            >
              Restart
            </button>
          </div>
          
          <div className="grid grid-cols-4 gap-2 w-full">
            {cards.map(card => (
              <div 
                key={card.id} 
                onClick={() => handleCardClick(card.id)}
                className={`relative aspect-square cursor-pointer transition-all duration-300 transform ${
                  card.flipped || card.matched 
                    ? 'rotate-y-180' 
                    : ''
                } ${
                  card.matched ? 'opacity-70' : ''
                }`}
              >
                <div className={`absolute inset-0 flex items-center justify-center rounded-md border border-white/10 ${
                  card.flipped || card.matched 
                    ? 'bg-accent/20 border-accent/30' 
                    : 'bg-zinc-800/80 hover:bg-zinc-700/80'
                } transition-all duration-300 transform perspective-500 ${
                  card.flipped || card.matched ? 'rotate-y-180' : ''
                }`}>
                  {(card.flipped || card.matched) && (
                    <span className="text-4xl">{card.content}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Quick instructions during game */}
          <div className="mt-4 text-xs text-white/50 text-center">
            <p>Match all pairs with the fewest moves to get a high score!</p>
          </div>
        </div>
      )}

      {gameState === GameState.Complete && (
        <div className="text-center p-6 max-w-xs mx-auto">
          <div className="w-20 h-20 bg-accent/20 rounded-full mx-auto flex items-center justify-center mb-4">
            <span className="text-4xl">🎉</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Well done!</h3>
          <p className="text-white/70 mb-2">You completed the game in:</p>
          <div className="flex justify-center gap-4 mb-4">
            <div className="bg-accent/20 px-3 py-2 rounded-md">
              <p className="text-xs text-white/60">Moves</p>
              <p className="text-xl font-bold text-white">{moves}</p>
            </div>
            <div className="bg-accent/20 px-3 py-2 rounded-md">
              <p className="text-xs text-white/60">Time</p>
              <p className="text-xl font-bold text-white">{formatTime(gameTime)}</p>
            </div>
          </div>
          
          {/* Score display */}
          <div className="bg-accent/30 px-4 py-3 rounded-lg mb-6">
            <p className="text-xs text-white/70 mb-1">Your Score</p>
            <p className="text-3xl font-bold text-white">{score}</p>
          </div>
          
          {bestScore !== null && bestScore === moves && (
            <div className="mb-4 py-2 px-4 bg-accent/30 rounded-lg text-sm text-white/90">
              🏆 New personal best moves!
            </div>
          )}
          
          {bestTime !== null && bestTime === gameTime && (
            <div className="mb-4 py-2 px-4 bg-accent/30 rounded-lg text-sm text-white/90">
              ⏱️ New personal best time!
            </div>
          )}
          
          <button 
            onClick={initializeGame}
            className="px-6 py-3 bg-accent hover:bg-accent-hover text-white rounded-lg shadow-lg transition-all duration-300 mb-2 w-full"
          >
            Play Again
          </button>
          <button 
            onClick={() => setGameState(GameState.Welcome)}
            className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white/80 hover:text-white rounded-lg transition-colors text-sm w-full"
          >
            Back to Start
          </button>
        </div>
      )}

      {/* Custom styles */}
      <style jsx>{`
        @keyframes rotate-y-180 {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(180deg); }
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .perspective-500 {
          perspective: 500px;
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
};

export default MemoryGame; 
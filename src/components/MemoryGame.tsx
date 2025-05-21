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
  }, [flippedCards, cards, gameState]);

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
  }, [matchedPairs, cardContents.length, gameState, moves, gameTime, calculateScore]);

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

  return (
    <div className="flex flex-col h-full w-full items-center justify-center bg-gradient-to-b from-black/50 to-black/30 rounded-lg overflow-hidden p-2 text-white">
      {gameState === GameState.Welcome && (
        <div className="text-center p-4 max-w-xs mx-auto">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-white mb-2">Memory Game!</h3>
            <p className="text-white/70 text-sm mb-3">Match all the pairs of cards.</p>
            
            {/* Instructions displayed directly without the bordered box */}
            <div className="text-xs text-white/60 mb-4">
              <p className="font-medium mb-1 text-white/80">How to Play:</p> {/* Slightly increased visibility for title */}
              <ul className="list-disc list-inside text-left space-y-0.5 pl-2"> {/* Added small padding for list items */}
                <li>Click a card to flip it.</li>
                <li>Flip another card to find a match.</li>
                <li>If they match, they stay flipped.</li>
                <li>If not, they flip back.</li>
                <li>Match all pairs to win!</li>
              </ul>
            </div>

            <button 
              onClick={initializeGame}
              className="w-full py-2.5 px-5 bg-gradient-to-r from-accent to-accent-blue hover:from-accent-light hover:to-accent-blue-light text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-sm"
            >
              Start Game
            </button>
          </div>
          {(bestScore !== null || bestTime !== null) && (
            <div className="mt-4 text-xs text-white/50 border-t border-white/10 pt-3">
              {bestTime !== null && <p>Best Time: {formatTime(bestTime)}</p>}
              {bestScore !== null && <p>Best Moves: {bestScore}</p>}
            </div>
          )}
        </div>
      )}
      
      {gameState === GameState.Playing && (
        <>
          <div className="grid grid-cols-4 gap-2 mb-3 p-2 bg-black/20 rounded-lg border border-white/10 max-w-[240px] mx-auto">
            {cards.map(card => (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-md flex items-center justify-center text-2xl sm:text-3xl cursor-pointer transition-all duration-300 preserve-3d shadow-md ${card.flipped || card.matched ? 'bg-accent/30 rotate-y-180' : 'bg-bg-darker hover:bg-accent/10'} ${card.matched ? 'opacity-70 ring-2 ring-green-400/50' : ''}`}
              >
                <div className={`transition-opacity duration-200 ${card.flipped || card.matched ? 'opacity-100' : 'opacity-0'} backface-hidden rotate-y-180`}>
                  {card.content}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center w-full max-w-[240px] mx-auto text-sm px-1">
            <p className="text-white/80">Moves: <span className="font-bold text-accent-light">{moves}</span></p>
            <p className="text-white/80">Time: <span className="font-bold text-accent-light">{formatTime(gameTime)}</span></p>
          </div>
        </>
      )}

      {gameState === GameState.Complete && (
        <div className="text-center p-4">
          <h3 className="text-2xl font-bold text-accent-light mb-2">You Won!</h3>
          <div className="mb-4 space-y-1 text-white/90">
            <p>Your Score: <span className="font-semibold text-lg text-white">{score}</span></p>
            <p>Moves: <span className="font-semibold text-white">{moves}</span></p>
            <p>Time: <span className="font-semibold text-white">{formatTime(gameTime)}</span></p>
          </div>
          {(bestTime !== null || bestScore !== null) && (
            <div className="mb-4 text-xs text-white/60 border-t border-white/10 pt-2">
              {bestTime !== null && <p>Best Time: {formatTime(bestTime)}</p>}
              {bestScore !== null && <p>Best Moves: {bestScore}</p>}
            </div>
          )}
          <button 
            onClick={initializeGame}
            className="w-full py-2.5 px-5 bg-gradient-to-r from-accent to-accent-blue hover:from-accent-light hover:to-accent-blue-light text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-sm"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default MemoryGame; 
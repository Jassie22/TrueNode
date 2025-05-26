'use client';

import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

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

interface Achievements {
  newHighScore: boolean;
  newFastestTime: boolean;
  newBestMoves: boolean;
}

const MemoryGame = () => {
  const gameWrapperRef = useRef<HTMLDivElement>(null); // Ref for the main game wrapper
  const cardGridRef = useRef<HTMLDivElement>(null); // Ref for the card grid
  const [isMobile, setIsMobile] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [gameState, setGameState] = useState<GameState>(GameState.Welcome);
  const [showInstructionsScreen, setShowInstructionsScreen] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [bestMoves, setBestMoves] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [gameStartTime, setGameStartTime] = useState<number>(0);
  const [gameTime, setGameTime] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [hasTriggeredConfetti, setHasTriggeredConfetti] = useState(false);
  const [achievements, setAchievements] = useState<Achievements>({
    newHighScore: false,
    newFastestTime: false,
    newBestMoves: false
  });

  // Card emojis for matching pairs
  const cardContents = ['🚀', '🌟', '🎮', '💻', '🤖', '🦄', '🎨', '🔮'];

  // Trigger confetti burst once
  const triggerConfetti = () => {
    if (!hasTriggeredConfetti) {
      confetti({
        origin: { x: 0.5, y: 0 },
        particleCount: 400,
        spread: 180,
        startVelocity: 45,
        zIndex: 999,
        ticks: 300,
        colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd'],
        gravity: 0.8,
        drift: 0,
        scalar: 1.2
      });
      setHasTriggeredConfetti(true);
    }
  };

  // Calculate score based on moves and time with new formula
  const calculateScore = (matchCount: number, moveCount: number, timeInSeconds: number) => {
    const baseScore = 1000;
    const movePenalty = 10;
    const timePenalty = 0.5;
    const minimumScore = 50;
    
    const score = Math.max(
      baseScore - (moveCount * movePenalty) - (timeInSeconds * timePenalty),
      minimumScore
    );
    
    return Math.round(score);
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
    setShowInstructionsScreen(false);
    setHasTriggeredConfetti(false); // Reset confetti trigger
    setAchievements({
      newHighScore: false,
      newFastestTime: false,
      newBestMoves: false
    });
    
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
      
      // Trigger confetti burst once
      triggerConfetti();
      
      // Check for achievements and save records
      const newAchievements = {
        newHighScore: false,
        newFastestTime: false,
        newBestMoves: false
      };

      // Save and check best score
      const storedBestScore = localStorage.getItem('memoryGameBestScore');
      const currentBestScore = storedBestScore ? parseInt(storedBestScore) : null;
      
      if (!currentBestScore || finalScore > currentBestScore) {
        localStorage.setItem('memoryGameBestScore', finalScore.toString());
        setBestScore(finalScore);
        newAchievements.newHighScore = true;
      } else {
        setBestScore(currentBestScore);
      }
      
      // Save and check best time
      const storedBestTime = localStorage.getItem('memoryGameBestTime');
      const currentBestTime = storedBestTime ? parseInt(storedBestTime) : null;
      
      if (!currentBestTime || gameTime < currentBestTime) {
        localStorage.setItem('memoryGameBestTime', gameTime.toString());
        setBestTime(gameTime);
        newAchievements.newFastestTime = true;
      } else {
        setBestTime(currentBestTime);
      }

      // Save and check best moves
      const storedBestMoves = localStorage.getItem('memoryGameBestMoves');
      const currentBestMoves = storedBestMoves ? parseInt(storedBestMoves) : null;
      
      if (!currentBestMoves || moves < currentBestMoves) {
        localStorage.setItem('memoryGameBestMoves', moves.toString());
        setBestMoves(moves);
        newAchievements.newBestMoves = true;
      } else {
        setBestMoves(currentBestMoves);
      }

      setAchievements(newAchievements);
    }
  }, [matchedPairs, cardContents.length, gameState, moves, gameTime, calculateScore, hasTriggeredConfetti]);

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

    const storedBestMoves = localStorage.getItem('memoryGameBestMoves');
    if (storedBestMoves) {
      setBestMoves(parseInt(storedBestMoves));
    }
    
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      window.removeEventListener('resize', checkMobile);
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

  const initializeGameAndResetWelcome = () => {
    initializeGame();
    setShowInstructionsScreen(false);
  };

  const handleBackToMenu = () => {
    setGameState(GameState.Welcome);
    setShowInstructionsScreen(false);
    setHasTriggeredConfetti(false); // Reset confetti trigger when going back to menu
  };

  return (
    <div 
      ref={gameWrapperRef}
      className={`
        relative flex flex-col items-center
        w-full max-w-md mx-auto
        h-[450px] max-h-[450px]
        bg-dark/20 rounded-lg overflow-hidden px-4 pb-4
        text-white text-center
      `}
    >
      {gameState === GameState.Welcome && (
        <>
          {!showInstructionsScreen ? (
            <div className="flex flex-col items-center justify-center h-full px-4 -mt-8">
              <h1 className="text-3xl font-bold leading-tight mb-4 text-center">
                Bored?<br />Play a game!
              </h1>
              <button 
                onClick={() => setShowInstructionsScreen(true)}
                className="text-lg bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium"
              >
                View Instructions
              </button>
            </div>
          ) : (
            <div className="flex flex-col h-full px-4 py-2 overflow-hidden">
              <h3 className="text-2xl font-bold mb-3 text-white text-center">How to Play</h3>
              <ul className="text-lg text-white/90 mb-0 space-y-2 text-left">
                <li className="flex items-start">
                  <span className="text-accent mr-3 mt-0.5 flex-shrink-0">•</span>
                  <span>Click cards to flip them over.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-3 mt-0.5 flex-shrink-0">•</span>
                  <span>Find and match pairs of identical cards.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-3 mt-0.5 flex-shrink-0">•</span>
                  <span>Match all pairs to win!</span>
                </li>
              </ul>
              {(bestScore !== null || bestTime !== null || bestMoves !== null) && (
                <div className="mb-2 p-0.5 bg-white/10 rounded-lg border border-white/20 mt-1">
                  <h4 className="text-base font-semibold text-white/80 mb-2">🏆 Records</h4>
                  <div className="space-y-1 text-base">
                    {bestScore !== null && <p className="text-white"><span className="font-bold text-yellow-400">Score:</span> {bestScore}</p>}
                    {bestTime !== null && <p className="text-white"><span className="font-bold text-green-400">Time:</span> {formatTime(bestTime)}</p>}
                    {bestMoves !== null && <p className="text-white"><span className="font-bold text-blue-400">Moves:</span> {bestMoves}</p>}
                  </div>
                </div>
              )}
              <div className="mt-4 space-y-3">
                <button 
                  onClick={initializeGame} 
                  className="w-full px-6 py-3 bg-gradient-to-r from-accent to-accent-blue hover:from-accent hover:to-accent-blue text-white font-semibold rounded-lg text-lg"
                >
                  Start Game
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {gameState === GameState.Playing && (
        <div className="flex flex-col w-full h-full px-2">
          <div className="flex justify-between items-center w-full text-sm mb-1">
            <div className="flex items-center gap-4">
              <span>Moves: <span className="font-bold text-yellow-400">{moves}</span></span>
              <span>Time: <span className="font-bold text-green-400">{formatTime(gameTime)}</span></span>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={initializeGameAndResetWelcome}
                className="p-2 bg-white/10 hover:bg-white/20 text-white rounded transition-colors"
                title="Restart Game"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              <button 
                onClick={handleBackToMenu}
                className="p-2 bg-white/10 hover:bg-white/20 text-white rounded transition-colors"
                title="Back to Menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </button>
            </div>
          </div>
          <div 
            ref={cardGridRef} 
            className={`grid grid-cols-4 gap-px w-full flex-1 max-h-[320px]`}
          >
            {cards.map(card => (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`aspect-square max-h-[90px] rounded-md flex items-center justify-center text-lg cursor-pointer transition-all duration-300 preserve-3d shadow-sm ${
                  card.flipped || card.matched ? 'bg-purple-600/70 border border-purple-400/50 rotate-y-180' : 'bg-gray-600/20 border border-white/10'
                } ${card.matched ? 'opacity-70 ring-1 ring-green-400/50' : ''}`}
              >
                <div className={`transition-opacity duration-200 ${card.flipped || card.matched ? 'opacity-100' : 'opacity-0'} backface-hidden rotate-y-180`}>
                  {card.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {gameState === GameState.Complete && (
        <div className="flex flex-col items-center justify-center h-full px-4">
          <h3 className="text-3xl font-bold mb-3 you-won-text-purple">
            You Won!
          </h3>
          
          {/* Achievements */}
          {(achievements.newHighScore || achievements.newFastestTime || achievements.newBestMoves) && (
            <div className="mb-3 space-y-1 text-base">
              {achievements.newHighScore && (
                <div className="text-yellow-400 font-bold">✅ New High Score!</div>
              )}
              {achievements.newFastestTime && (
                <div className="text-green-400 font-bold">⏱ New Fastest Time!</div>
              )}
              {achievements.newBestMoves && (
                <div className="text-blue-400 font-bold">🧠 Best Move Count!</div>
              )}
            </div>
          )}

          <div className="mb-3 space-y-1 text-base">
            <div>Score: <span className="font-semibold text-yellow-400">{score}</span></div>
            <div>Moves: <span className="font-semibold text-blue-400">{moves}</span></div>
            <div>Time: <span className="font-semibold text-green-400">{formatTime(gameTime)}</span></div>
          </div>
          
          {(bestTime !== null || bestScore !== null || bestMoves !== null) && (
            <div className="mb-3 text-sm text-white/70 border-t border-white/20 pt-2">
              {bestScore !== null && <div>Best Score: <span className="text-yellow-400 font-semibold">{bestScore}</span></div>}
              {bestTime !== null && <div>Best Time: <span className="text-green-400 font-semibold">{formatTime(bestTime)}</span></div>}
              {bestMoves !== null && <div>Best Moves: <span className="text-blue-400 font-semibold">{bestMoves}</span></div>}
            </div>
          )}
          
          <div className="flex flex-col gap-2 w-full">
            <button 
              onClick={initializeGameAndResetWelcome}
              className="text-base bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium"
            >
              Play Again
            </button>
            <button 
              onClick={handleBackToMenu}
              className="text-sm bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded"
            >
              Back to Menu
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;

// ADDED: Shiny button CSS and You Won text styling
const shinyButtonStyles = `
  .shiny-button {
    position: relative;
    overflow: hidden;
    z-index: 1; /* Ensure button content is above the ::after element */
  }
  .shiny-button::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%);
    transform: rotate(45deg);
    transition: transform 0.7s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.4s ease-out; /* Added opacity transition */
    opacity: 0;
  }
  .shiny-button:hover::after {
    transform: rotate(45deg) scale(2) translateX(-25%) translateY(-25%);
    opacity: 1;
  }
  .you-won-text {
    color: white;
    text-shadow: 0 0 10px #a855f7, 0 0 20px #a855f7;
  }
`;

if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  // Check if the game styles are already added to avoid duplication
  if (!document.getElementById('memory-game-shiny-styles')) {
    styleElement.id = 'memory-game-shiny-styles';
    styleElement.innerHTML = shinyButtonStyles;
    document.head.appendChild(styleElement);
  }
} 
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
  const gameWrapperRef = useRef<HTMLDivElement>(null); // Ref for the main game wrapper
  const cardGridRef = useRef<HTMLDivElement>(null); // Ref for the card grid
  const [isMobile, setIsMobile] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [gameState, setGameState] = useState<GameState>(GameState.Welcome);
  const [showInstructionsScreen, setShowInstructionsScreen] = useState(false);
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
    setShowInstructionsScreen(false);
    
    // Set start time and start timer
    const startTime = Date.now();
    setGameStartTime(startTime);
    
    // Clear any existing timer
    if (timerRef.current) clearInterval(timerRef.current);
    
    // Start a new timer that properly calculates elapsed time from now
    timerRef.current = setInterval(() => {
      setGameTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    // Optional: Exit fullscreen if game is restarted from complete/playing state while fullscreen
    if (isFullscreen && typeof document.exitFullscreen === 'function') {
      // document.exitFullscreen(); // Uncomment to enable exiting fullscreen on restart
    }
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
    
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      window.removeEventListener('resize', checkMobile);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
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

  const toggleFullscreen = () => {
    if (!gameWrapperRef.current) return;

    if (!document.fullscreenElement) {
      gameWrapperRef.current.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const initializeGameAndResetWelcome = () => {
    initializeGame();
    setShowInstructionsScreen(false);
  };

  const handleBackToMenu = () => {
    setGameState(GameState.Welcome);
    setShowInstructionsScreen(false);
  };

  return (
    <div 
      ref={gameWrapperRef}
      className={`relative flex flex-col items-center justify-center p-4 rounded-lg shadow-xl bg-gradient-to-br from-bg-darker/80 to-bg-dark/90 backdrop-blur-md border border-white/10 w-full transition-all duration-300 ease-in-out ${isFullscreen && isMobile ? 'fixed inset-0 z-50 rounded-none' : 'max-w-md mx-auto min-h-[380px]'} ${ gameState === GameState.Playing || gameState === GameState.Complete ? 'sm:p-6' : 'sm:p-4'}`}
    >
      {/* Fullscreen toggle button - only on mobile and not on any welcome screen variant */}
      {isMobile && gameState !== GameState.Welcome && (
        <button 
          onClick={toggleFullscreen}
          className="absolute top-2 right-2 p-1.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-20"
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          {isFullscreen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 0h-4m4 0l-5-5" />
            </svg>
          )}
        </button>
      )}

      {gameState === GameState.Welcome && (
        <>
          {!showInstructionsScreen ? (
            <div className="text-center text-white animate-fadeIn">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-accent">Bored? Play a game!</h2>
              <button 
                onClick={() => setShowInstructionsScreen(true)}
                className="shiny-button px-6 py-2.5 bg-accent text-white font-semibold rounded-lg shadow-lg transition-all duration-300 text-md focus:outline-none focus:ring-2 focus:ring-accent-dark focus:ring-opacity-50"
              >
                View Instructions
              </button>
            </div>
          ) : (
            <div className="text-center text-white animate-fadeIn">
              <h3 className="text-xl font-bold mb-3 text-white">How to Play</h3>
              <ul className="text-sm text-white/80 mb-4 space-y-1.5 text-left max-w-xs mx-auto px-2">
                <li className="flex items-start">
                  <span className="text-accent mr-2 mt-1">&#8226;</span>
                  <span>Click on cards to flip them over.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2 mt-1">&#8226;</span>
                  <span>Find and match pairs of identical cards.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2 mt-1">&#8226;</span>
                  <span>Match all pairs to win the game!</span>
                </li>
              </ul>
              {(bestScore !== null || bestTime !== null) && (
                <div className="my-3 text-white/70 text-xs">
                  {bestScore !== null && <p>Best Score (Moves): {bestScore}</p>}
                  {bestTime !== null && <p>Best Time: {formatTime(bestTime)}</p>}
                </div>
              )}
              <button 
                onClick={initializeGame} 
                className="px-7 py-2.5 bg-accent hover:bg-accent text-white font-semibold rounded-lg shadow-lg transition-all duration-200 text-md focus:outline-none focus:ring-2 focus:ring-accent-dark focus:ring-opacity-50 mb-2.5"
              >
                Start Game
              </button>
              <button 
                onClick={() => setShowInstructionsScreen(false)}
                className="px-5 py-1.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-colors text-xs"
              >
                Back
              </button>
            </div>
          )}
        </>
      )}

      {gameState === GameState.Playing && (
        <>
          <div className="flex justify-between items-center w-full max-w-xs mx-auto text-sm px-1 mb-3">
            <p className="text-white/80">Moves: <span className="font-bold text-accent-light">{moves}</span></p>
            <p className="text-white/80">Time: <span className="font-bold text-accent-light">{formatTime(gameTime)}</span></p>
          </div>
          <div 
            ref={cardGridRef} 
            className={`grid grid-cols-4 gap-2.5 sm:gap-3 p-2.5 sm:p-3 bg-black/20 rounded-lg border border-white/10 w-full max-w-xs mx-auto ${
              isFullscreen && isMobile ? '!max-w-full !gap-3 sm:!gap-4 landscape:!gap-2 landscape:max-w-[300px] portrait:p-4' : 'sm:max-w-sm'
            }`}
          >
            {cards.map(card => (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`aspect-square rounded-md flex items-center justify-center text-3xl sm:text-4xl cursor-pointer transition-all duration-300 preserve-3d shadow-md ${card.flipped || card.matched ? 'bg-accent/30 rotate-y-180' : 'bg-bg-darker hover:bg-accent/10'} ${card.matched ? 'opacity-70 ring-2 ring-green-400/50' : ''} ${
                  isFullscreen && isMobile ? '!w-16 !h-16 sm:!w-20 sm:!h-20 landscape:!w-12 landscape:!h-12 landscape:text-2xl !text-4xl' : ''
                }`}
              >
                <div className={`transition-opacity duration-200 ${card.flipped || card.matched ? 'opacity-100' : 'opacity-0'} backface-hidden rotate-y-180`}>
                  {card.content}
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={initializeGameAndResetWelcome}
            title="Restart Game"
            className="absolute top-3 left-3 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M4 9a8 8 0 0111.53-6.47L12 6M20 19v-5h-5M20 15a8 8 0 01-11.53 6.47L12 18" />
            </svg>
          </button>
          <button 
            onClick={handleBackToMenu}
            className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-colors mt-4 text-sm"
          >
            Back to Menu
          </button>
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
            <div className="mb-4 text-xs text-white/60 border-t border-white/10 pt-2 mt-4">
              {bestTime !== null && <p>Best Time: {formatTime(bestTime)}</p>}
              {bestScore !== null && <p>Best Moves: {bestScore}</p>}
            </div>
          )}
          <button 
            onClick={initializeGameAndResetWelcome}
            className="w-full py-2.5 px-5 bg-gradient-to-r from-accent to-accent-blue hover:from-accent-light hover:to-accent-blue-light text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-sm"
          >
            Play Again
          </button>
          <button 
            onClick={handleBackToMenu}
            className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-colors mt-2"
          >
            Back to Menu
          </button>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;

// ADDED: Shiny button CSS
const shinyButtonStyles = `
  .shiny-button {
    position: relative;
    overflow: hidden;
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
    transition: transform 0.7s cubic-bezier(0.19, 1, 0.22, 1);
    opacity: 0;
  }
  .shiny-button:hover::after {
    transform: rotate(45deg) scale(2) translateX(-25%) translateY(-25%);
    opacity: 1;
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
'use client';

import { createGame } from "./index";
import { useState, useEffect } from "react";

interface Person {
  name: string;
  image: string;
}

interface Game {
  id?: number;
  status: "waiting";
  people: Person[];
  correctPersonIndex: number;
}

export default function GamePage() {
  const [game, setGame] = useState<Game | null>(null);
  const [eliminatedPeople, setEliminatedPeople] = useState<Set<number>>(new Set());
  const [gameWon, setGameWon] = useState(false);
  const [showFeedback, setShowFeedback] = useState<{ index: number; correct: boolean } | null>(null);

  useEffect(() => {
    createGame().then(setGame);
  }, []);

  const handlePersonClick = (index: number) => {
    if (gameWon || showFeedback) return;

    const isCorrect = index === game?.correctPersonIndex;
    
    if (isCorrect) {
      setGameWon(true);
      setShowFeedback({ index, correct: true });
    } else {
      setShowFeedback({ index, correct: false });
      // Hide feedback after 1 second and eliminate the person
      setTimeout(() => {
        setShowFeedback(null);
        setEliminatedPeople(prev => new Set([...prev, index]));
      }, 1000);
    }
  };

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
            🎭 Guess Who? 🎭
          </h1>
        </div>

        {/* Game Board */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl">
          {/* People Grid */}
          <div className="grid grid-cols-2 gap-4">
            {game.people.map((person, index) => {
              const isEliminated = eliminatedPeople.has(index);
              return (
                <div
                  key={index}
                  className={`card shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden cursor-pointer relative aspect-square ${
                    gameWon && index === game.correctPersonIndex ? 'ring-4 ring-green-500' : ''
                  }`}
                  onClick={() => handlePersonClick(index)}
                >
                  <img 
                    src={`/${person.image}`} 
                    alt={person.name}
                    className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-300 ${
                      isEliminated ? 'grayscale opacity-50' : ''
                    }`}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <div 
                    className={`absolute inset-0 w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-600 font-bold text-lg transition-all duration-300 ${
                      isEliminated ? 'grayscale opacity-50' : ''
                    }`}
                    style={{ display: 'none' }}
                  >
                    {person.name.charAt(0)}
                  </div>
                  {isEliminated && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-1 bg-red-600 transform rotate-45 shadow-lg"></div>
                    </div>
                  )}
                  {showFeedback && showFeedback.index === index && (
                    <div className={`absolute inset-0 flex items-center justify-center ${
                      showFeedback.correct ? 'bg-green-500/90' : 'bg-red-500/90'
                    }`}>
                      <div className="text-white text-4xl font-bold">
                        {showFeedback.correct ? '🎉' : '❌'}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Game Status */}
          {gameWon ? (
            <div className="mt-8 p-4 bg-gradient-to-r from-green-100 to-green-200 rounded-2xl border-2 border-green-400">
              <div className="text-center">
                <h3 className="font-bold text-green-800 mb-2">🎉 Congratulations!</h3>
                <p className="text-sm text-green-700">
                  You found the correct person: {game?.people[game.correctPersonIndex]?.name}!
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-8 p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl border-2 border-dashed border-blue-300">
              <div className="text-center">
                <h3 className="font-bold text-blue-800 mb-2">🎲 How to Play</h3>
                <p className="text-sm text-blue-700">
                  Click on people to guess who the correct person is!
                </p>
              </div>
            </div>
          )}

          {/* New Game Button */}
          <div className="text-center mt-6">
            <button 
              onClick={() => {
                setGame(null);
                setEliminatedPeople(new Set());
                setGameWon(false);
                setShowFeedback(null);
                createGame().then(setGame);
              }}
              className="btn btn-lg bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700 rounded-full px-8 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {gameWon ? '🎮 New Game' : '🚀 Start Playing!'}
            </button>
          </div>
        </div>

        {/* Fun Footer */}
        <div className="text-center mt-6">
          <p className="text-white/80 text-sm font-medium">
            ✨ Have fun guessing! ✨
          </p>
        </div>
      </div>
    </div>
  );
}

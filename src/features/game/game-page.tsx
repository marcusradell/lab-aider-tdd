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
}

export default function GamePage() {
  const [game, setGame] = useState<Game | null>(null);
  const [eliminatedPeople, setEliminatedPeople] = useState<Set<number>>(new Set());

  useEffect(() => {
    createGame().then(setGame);
  }, []);

  const toggleElimination = (index: number) => {
    setEliminatedPeople(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
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
                  className="card shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden cursor-pointer relative aspect-square"
                  onClick={() => toggleElimination(index)}
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
                </div>
              );
            })}
          </div>

          {/* Game Instructions */}
          <div className="mt-8 p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl border-2 border-dashed border-green-300">
            <div className="text-center">
              <h3 className="font-bold text-green-800 mb-2">🎲 How to Play</h3>
              <p className="text-sm text-green-700">
                Pick a person and ask yes/no questions to guess who your friend
                chose!
              </p>
            </div>
          </div>

          {/* Start Game Button */}
          <div className="text-center mt-6">
            <button className="btn btn-lg bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700 rounded-full px-8 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              🚀 Start Playing!
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

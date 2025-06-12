'use client';

import { useState } from 'react';

export default function GamePage() {
  // Inline mocked data
  const [gameStatus, setGameStatus] = useState('playing');
  const [question, setQuestion] = useState('');
  const [lastAnswer, setLastAnswer] = useState('');
  const [people] = useState([
    { id: 1, name: 'Alice', image: 'alice.jpg', eliminated: false },
    { id: 2, name: 'Bob', image: 'bob.jpg', eliminated: false },
    { id: 3, name: 'Charlie', image: 'charlie.jpg', eliminated: true },
    { id: 4, name: 'Diana', image: 'diana.jpg', eliminated: false },
    { id: 5, name: 'Eve', image: 'eve.jpg', eliminated: false },
    { id: 6, name: 'Frank', image: 'frank.jpg', eliminated: true },
  ]);

  // Inline mocked behavior
  const handleAskQuestion = () => {
    if (!question.trim()) return;
    
    // Mock answer logic
    const answers = ['Yes', 'No'];
    const mockAnswer = answers[Math.floor(Math.random() * answers.length)];
    setLastAnswer(`Q: ${question} A: ${mockAnswer}`);
    setQuestion('');
  };

  const handleGuess = (personName: string) => {
    // Mock win/lose logic
    const isCorrect = Math.random() > 0.5;
    if (isCorrect) {
      setGameStatus('won');
      setLastAnswer(`Correct! The person was ${personName}!`);
    } else {
      setGameStatus('lost');
      setLastAnswer(`Wrong! The person was not ${personName}.`);
    }
  };

  const resetGame = () => {
    setGameStatus('playing');
    setQuestion('');
    setLastAnswer('');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Guess Who Game</h1>
      
      {/* Game Status */}
      <div className="mb-6 p-4 bg-gray-100 rounded">
        <h2 className="text-xl font-semibold mb-2">Game Status: {gameStatus}</h2>
        {lastAnswer && (
          <p className="text-gray-700">{lastAnswer}</p>
        )}
        {gameStatus !== 'playing' && (
          <button 
            onClick={resetGame}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Play Again
          </button>
        )}
      </div>

      {/* Question Input */}
      {gameStatus === 'playing' && (
        <div className="mb-6 p-4 bg-white border rounded">
          <h3 className="text-lg font-semibold mb-2">Ask a Yes/No Question</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g., Does the person have brown hair?"
              className="flex-1 px-3 py-2 border rounded"
              onKeyPress={(e) => e.key === 'Enter' && handleAskQuestion()}
            />
            <button
              onClick={handleAskQuestion}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Ask
            </button>
          </div>
        </div>
      )}

      {/* People Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {people.map((person) => (
          <div
            key={person.id}
            className={`border rounded p-4 text-center ${
              person.eliminated 
                ? 'bg-gray-200 opacity-50' 
                : 'bg-white hover:bg-gray-50 cursor-pointer'
            }`}
            onClick={() => !person.eliminated && gameStatus === 'playing' && handleGuess(person.name)}
          >
            <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-2 flex items-center justify-center">
              <span className="text-gray-600">IMG</span>
            </div>
            <h3 className={`font-semibold ${person.eliminated ? 'line-through' : ''}`}>
              {person.name}
            </h3>
            {person.eliminated && (
              <p className="text-sm text-red-500 mt-1">Eliminated</p>
            )}
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div className="mt-8 p-4 bg-blue-50 rounded">
        <h3 className="font-semibold mb-2">How to Play:</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>1. Ask yes/no questions to narrow down the possibilities</li>
          <li>2. Click on a person when you think you know who it is</li>
          <li>3. Try to guess correctly with as few questions as possible!</li>
        </ul>
      </div>
    </div>
  );
}

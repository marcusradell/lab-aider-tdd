'use client';

import { useState, useEffect } from 'react';
import { createGame } from './index';

export default function GamePage() {
  const [game, setGame] = useState<any>(null);

  useEffect(() => {
    createGame().then(setGame);
  }, []);

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Guess Who Game</h1>
      <p>Game Status: {game.status}</p>
      <h2>People:</h2>
      <ul>
        {game.people.map((person: any, index: number) => (
          <li key={index}>
            <div>Name: {person.name}</div>
            <div>Image: {person.image}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

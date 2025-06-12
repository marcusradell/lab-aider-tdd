import { createGame } from './index';

export default async function GamePage() {
  const game = await createGame();

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

export default function GamePage() {
  // Inline mocked data
  const game = {
    status: 'waiting',
    people: [
      {
        name: 'Alice',
        image: 'alice.jpg'
      },
      {
        name: 'Bob', 
        image: 'bob.jpg'
      }
    ]
  };

  return (
    <div>
      <h1>Guess Who Game</h1>
      <p>Game Status: {game.status}</p>
      <h2>People:</h2>
      <ul>
        {game.people.map((person, index) => (
          <li key={index}>
            <div>Name: {person.name}</div>
            <div>Image: {person.image}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

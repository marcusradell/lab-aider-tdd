export function createGame() {
  return {
    status: 'waiting' as const,
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
}

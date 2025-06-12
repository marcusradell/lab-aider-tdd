interface Person {
  name: string;
  image: string;
}

interface Game {
  status: 'waiting';
  people: Person[];
}

class InMemoryGameRepository {
  private games: Game[] = [];

  async save(game: Game): Promise<Game> {
    this.games.push(game);
    return game;
  }

  async findAll(): Promise<Game[]> {
    return this.games;
  }
}

export class GameService {
  private repository = new InMemoryGameRepository();

  async createGame(): Promise<Game> {
    const game: Game = {
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

    return await this.repository.save(game);
  }
}

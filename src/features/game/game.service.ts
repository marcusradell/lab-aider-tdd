import { GameRepository } from './game.repository';

interface Person {
  name: string;
  image: string;
}

interface Game {
  id?: number;
  status: 'waiting';
  people: Person[];
}

export class GameService {
  private repository = new GameRepository();

  async createGame(): Promise<Game> {
    const game = {
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

    return await this.repository.save(game);
  }
}

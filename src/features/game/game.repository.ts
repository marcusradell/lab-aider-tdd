import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { games, type Game, type NewGame } from './game.schema';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://localhost:5432/test'
});

const db = drizzle(pool);

interface Person {
  name: string;
  image: string;
}

interface GameData {
  id?: number;
  status: 'waiting';
  people: Person[];
}

export class GameRepository {
  async save(gameData: Omit<GameData, 'id'>): Promise<GameData> {
    const [savedGame] = await db.insert(games).values({
      status: gameData.status,
      people: gameData.people
    }).returning();
    
    return {
      id: savedGame.id,
      status: savedGame.status as 'waiting',
      people: savedGame.people as Person[]
    };
  }

  async findAll(): Promise<GameData[]> {
    const allGames = await db.select().from(games);
    
    return allGames.map(game => ({
      id: game.id,
      status: game.status as 'waiting',
      people: game.people as Person[]
    }));
  }
}

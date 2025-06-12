import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { games, type Game, type NewGame } from './game.schema';

// Mock database connection for now
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
    // For now, mock the database save
    const mockId = Math.floor(Math.random() * 1000);
    return {
      id: mockId,
      ...gameData
    };
  }

  async findAll(): Promise<GameData[]> {
    // For now, return empty array
    return [];
  }
}

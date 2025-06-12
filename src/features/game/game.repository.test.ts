import { test, describe } from 'node:test';
import assert from 'node:assert';
import { GameRepository } from './game.repository';

describe('GameRepository', () => {
  test('should save and retrieve a game from database', async () => {
    const repository = new GameRepository();
    const game = {
      status: 'waiting' as const,
      people: [
        { name: 'Alice', image: 'alice.png' },
        { name: 'Bob', image: 'bob.png' },
        { name: 'Cecilia', image: 'cecilia.png' }
      ]
    };

    const savedGame = await repository.save(game);
    assert.strictEqual(savedGame.status, 'waiting');
    assert.ok(savedGame.id);
  });

  test('should find all games from database', async () => {
    const repository = new GameRepository();
    const games = await repository.findAll();
    assert.ok(Array.isArray(games));
  });
});

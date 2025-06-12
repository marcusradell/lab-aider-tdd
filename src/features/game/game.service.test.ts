import { test, describe } from 'node:test';
import assert from 'node:assert';
import { GameService } from './game.service';

describe('GameService', () => {
  test('should create a new game with initial state', async () => {
    const gameService = new GameService();
    const game = await gameService.createGame();
    assert.strictEqual(game.status, 'waiting');
  });

  test('should create a game with a collection of people', async () => {
    const gameService = new GameService();
    const game = await gameService.createGame();
    assert.ok(Array.isArray(game.people));
    assert.ok(game.people.length > 0);
    assert.ok(game.people[0].name);
    assert.ok(game.people[0].image);
  });
});

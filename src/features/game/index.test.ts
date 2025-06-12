import { test, describe } from 'node:test';
import assert from 'node:assert';
import { createGame } from './index';

describe('Game', () => {
  test('should create a new game with initial state', () => {
    const game = createGame();
    assert.strictEqual(game.status, 'waiting');
  });

  test('should create a game with a collection of people', () => {
    const game = createGame();
    assert.ok(Array.isArray(game.people));
    assert.ok(game.people.length > 0);
    assert.ok(game.people[0].name);
    assert.ok(game.people[0].image);
  });
});

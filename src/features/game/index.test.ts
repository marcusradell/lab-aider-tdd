import { test, describe } from 'node:test';
import assert from 'node:assert';
import { createGame } from './index';

describe('Game', () => {
  test('should create a new game with initial state', () => {
    const game = createGame();
    assert.strictEqual(game.status, 'waiting');
  });
});

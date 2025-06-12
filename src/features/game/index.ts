import { createGameAction } from './game.actions';

export async function createGame() {
  return await createGameAction();
}

'use server';

import { GameService } from './game.service';

const gameService = new GameService();

export async function createGameAction() {
  return await gameService.createGame();
}

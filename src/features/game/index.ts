import { GameService } from './game.service';

const gameService = new GameService();

export async function createGame() {
  return await gameService.createGame();
}

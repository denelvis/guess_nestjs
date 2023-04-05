import { randomUUID } from 'crypto';

import { GuessNumberDto } from '../game/dtos';
import { randomInterval } from './random-interval.util';

export const cpuRandom = (
  quantityPlayers: number,
  betPoint: number,
  max = 20,
  min = 1,
): GuessNumberDto[] => {
  const cpuPlayersGuess: GuessNumberDto[] = [];

  for (let i = 0; i < quantityPlayers; i++) {
    cpuPlayersGuess.push({
      gameProfileId: randomUUID(),
      bet: betPoint,
      factor: randomInterval(),
      totalScore: 0,
    });
  }

  return cpuPlayersGuess;
};

import { GuessNumberDto } from '../game/dtos';
import { IRoundResults } from '../game/interfaces';

export const calculateResults = (
  players: GuessNumberDto[],
  gameFactor: number,
): IRoundResults[] => {
  const results: IRoundResults[] = [];

  players.map(player => {
    if (gameFactor < player.factor)
      results.push({
        gameProfileId: player.gameProfileId,
        totalScore: player.totalScore + 0,
      });
    else
      results.push({
        gameProfileId: player.gameProfileId,
        totalScore: +player.totalScore.toFixed(3) + player.bet * player.factor,
      });
  });

  return results;
};

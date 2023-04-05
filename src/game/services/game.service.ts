import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { GuessNumberDto } from '../dtos';
import { GameEntity } from '../entities';
import { IGameRounds, IRoundResults } from '../interfaces';
import { GameRepository } from '../repositories';
import { RankingService } from './ranking.service';
import { calculateResults, cpuRandom, randomInterval } from '../../utils';

@Injectable()
export class GameService {
  constructor(
    protected readonly gameRepository: GameRepository,
    protected readonly rankingService: RankingService,
  ) {}

  async addGameRound(gameId: string): Promise<GameEntity> {
    return this.gameRepository.addRound(gameId);
  }

  async end(gameId: string): Promise<GameEntity> {
    return this.gameRepository.endCurrentGame(gameId);
  }

  async getAllGames(): Promise<GameEntity[]> {
    return this.gameRepository.findAll();
  }

  async getOneGame(gameId: string): Promise<GameEntity> {
    return this.gameRepository.findOneById({ id: gameId });
  }

  async getGameTotalRounds(gameId: string): Promise<IGameRounds> {
    const game = await this.getOneGame(gameId);
    if (!game) throw new NotFoundException('Game not found');
    return {
      round: game.totalRounds,
    };
  }

  async guessAttempt(
    payload: GuessNumberDto,
    gameId: string,
  ): Promise<IRoundResults[]> {
    const gameFactor = randomInterval();

    const { round: roundNumber } = await this.getGameTotalRounds(gameId);

    if (roundNumber === 0) {
      const cpuPlayers = cpuRandom(3, payload.bet);

      const results: IRoundResults[] = calculateResults(
        [payload].concat(cpuPlayers),
        gameFactor,
      );

      await this.rankingService.saveRate(gameId, results);

      return results;
    } else {
      const playersRanking = await this.rankingService.currentGameResults(
        gameId,
      );

      const players: GuessNumberDto[] = playersRanking.map(
        ({ gameProfileId, totalScore }) => {
          if (gameProfileId === payload.gameProfileId) {
            return {
              gameProfileId,
              totalScore,
              bet: payload.bet,
              factor: payload.factor,
            };
          }

          return {
            gameProfileId,
            totalScore,
            bet: payload.bet,
            factor: randomInterval(),
          };
        },
      );

      const results: IRoundResults[] = calculateResults(players, gameFactor);

      await this.rankingService.saveRate(gameId, results);

      return results;
    }
  }

  async start(): Promise<GameEntity> {
    return this.gameRepository.create();
  }
}

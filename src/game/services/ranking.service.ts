import { Injectable } from '@nestjs/common';

import { GameRepository, RankingRepository } from '../repositories';
import { IRoundResults } from '../interfaces';
import { RankingEntity } from '../entities';

@Injectable()
export class RankingService {
  constructor(
    protected readonly rankingRepository: RankingRepository,
    protected readonly gameRepository: GameRepository,
  ) {}

  async saveRate(gameId: string, results: IRoundResults[]): Promise<void> {
    Promise.all(results.map(res => {
      this.rankingRepository.saveResults(gameId, res);
    }));
  }

  async currentGameResults(gameId: string): Promise<RankingEntity[]> {
    return this.rankingRepository.findCurrentGame({ gameId });
  }
}

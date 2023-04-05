import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import { RankingEntity } from '../entities';
import { IRoundResults } from '../interfaces';

@Injectable()
export class RankingRepository {
  constructor(
    @InjectRepository(RankingEntity)
    protected readonly rankingRepository: Repository<RankingEntity>,
  ) {}

  async findCurrentGame(
    filter: FindOptionsWhere<RankingEntity>,
  ): Promise<RankingEntity[]> {
    return this.rankingRepository.find({ where: filter });
  }

  async saveResults(gameId: string, results: IRoundResults): Promise<void> {
    const result = this.rankingRepository.create({ gameId, ...results });
    await this.rankingRepository.save(result);
  }
}

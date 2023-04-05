import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import { GameEntity, GameStatus } from '../entities';

@Injectable()
export class GameRepository {
  constructor(
    @InjectRepository(GameEntity)
    protected readonly gameRepository: Repository<GameEntity>,
  ) {}

  async addRound(gameId: string): Promise<GameEntity> {
    const game = await this.findOneById({ id: gameId });
    Object.assign(game, { totalRounds: game.totalRounds + 1 });
    await this.gameRepository.save(game);
    return this.findOneById({ id: gameId });
  }

  async create(): Promise<GameEntity> {
    const game = this.gameRepository.create();
    return this.gameRepository.save(game);
  }

  async endCurrentGame(gameId: string): Promise<GameEntity> {
    const game = await this.findOneById({ id: gameId });
    Object.assign(game, { status: GameStatus.FINISHED });
    await this.gameRepository.save(game);
    return this.findOneById({ id: gameId });
  }

  async findAll(): Promise<GameEntity[]> {
    return this.gameRepository.find();
  }

  async findOneById(filter: FindOptionsWhere<GameEntity>): Promise<GameEntity> {
    return this.gameRepository.findOne({ where: filter });
  }
}

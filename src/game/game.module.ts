import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GameController } from './controllers';
import { GameEntity, GameProfileEntity, RankingEntity } from './entities';
import { GameRepository, RankingRepository } from './repositories';
import { GameService, RankingService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([GameEntity, RankingEntity, GameProfileEntity])],
  controllers: [GameController],
  providers: [GameService, RankingService, GameRepository, RankingRepository],
})
export class GameModule {}

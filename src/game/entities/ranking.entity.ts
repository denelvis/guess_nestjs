import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

import { CommonEntity } from '../../common/entities/common.entity';
import { GameEntity } from './game.entity';
import { IsNotEmpty } from 'class-validator';
import { GameProfileEntity } from './game-profile.entity';


@Entity('ranking')
@Index(['gameId', 'gameProfileId'])
export class RankingEntity extends CommonEntity {
  @ApiProperty({description: 'Total score of player in game' })
  @Column({
    type: 'int',
    default: 0,
  })
  totalScore: number;

  @ApiProperty({ format: 'uuid' })
  @IsNotEmpty()
  @Column({ type: 'uuid' })
  gameId: string;

  @ApiProperty({ type: () => GameEntity })
  @OneToOne(() => GameEntity, game => game.id)
  game: GameEntity;

  @ApiProperty({ format: 'uuid' })
  @IsNotEmpty()
  @Column({ type: 'uuid' })
  gameProfileId: string;

  @ApiProperty({
    type: () => GameProfileEntity,
  })
  @ManyToOne(() => GameProfileEntity, gameProfile => gameProfile.id)
  gameProfile: GameProfileEntity;
}

import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';

import { CommonEntity } from '../../common/entities/common.entity';

export enum GameStatus {
  ACTIVE = 'active',
  FINISHED = 'finished',
}

@Entity('game')
export class GameEntity extends CommonEntity {
  @ApiProperty({ description: 'Current game status' })
  @Column({
    type: 'enum',
    enum: GameStatus,
    default: GameStatus.ACTIVE,
  })
  status: GameStatus;

  @ApiProperty({ description: 'Total finished rounds in game' })
  @Column({
    type: 'int',
    default: 0,
  })
  totalRounds: number;
}

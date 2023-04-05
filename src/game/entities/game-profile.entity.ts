import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, OneToMany } from 'typeorm';

import { CommonEntity } from '../../common/entities/common.entity';
import { RankingEntity } from './ranking.entity';


@Entity('game_profiles')
export class GameProfileEntity extends CommonEntity {
  @ApiPropertyOptional()
  @Column({ type: 'varchar', nullable: true })
  nickname: string;

  @ApiProperty({ type: () => RankingEntity, isArray: true })
  @OneToMany(() => RankingEntity, ranking => ranking.gameProfile, {
    cascade: true,
  })
  ranking: RankingEntity[];
}

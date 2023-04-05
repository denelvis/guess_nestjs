import { IsNumber, IsPositive, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GuessNumberDto {
  @ApiProperty()
  @IsUUID()
  gameProfileId: string;

  @ApiProperty()
  @IsNumber()
  totalScore: number;

  @ApiProperty()
  @IsPositive()
  bet: number;

  @ApiProperty()
  @IsPositive()
  factor: number;
}

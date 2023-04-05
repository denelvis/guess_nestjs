import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GameEntity } from '../entities';
import { GameService } from '../services';
import { IGameRounds, IRoundResults } from '../interfaces';
import { GuessNumberDto } from '../dtos';

@ApiTags('Game')
@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get()
  async getGames(): Promise<GameEntity[]> {
    return this.gameService.getAllGames();
  }

  @Get('/:id/rounds')
  async getGameRounds(@Param('id') id: string): Promise<IGameRounds> {
    return this.gameService.getGameTotalRounds(id);
  }

  @Get('/:id')
  async getGame(@Param('id') id: string): Promise<GameEntity> {
    return this.gameService.getOneGame(id);
  }

  @Post('/start')
  async newGame(): Promise<GameEntity> {
    return this.gameService.start();
  }

  @Post('/end')
  async endGame(@Body('id') id: string): Promise<GameEntity> {
    return this.gameService.end(id);
  }

  @Post('/:id/guess')
  async guessNumber(@Body() payload: GuessNumberDto, @Param('id') id: string): Promise<IRoundResults[]> {
    return this.gameService.guessAttempt(payload, id);
  }
}

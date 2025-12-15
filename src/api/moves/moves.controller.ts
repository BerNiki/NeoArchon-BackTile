import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { GetUser } from '../users/decorators/get-user.decorator';
import { MoveDto } from './dto/move.dto';
import { MovesService } from './moves.service';
import { User } from '../users/entities/users.entity';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { GetMovesDto } from './dto/move.dto';

@UseGuards(JwtGuard)
@Controller('moves')
export class MovesController {
  constructor(private readonly moveService: MovesService) {}
  @Post()
  async move(@GetUser() user: User, @Body() moveDto: MoveDto) {
    const nextPlayer = await this.moveService.move(user, moveDto);
    return nextPlayer;
  }
  @Patch()
  async getMoves(@Body() getMovesDto: GetMovesDto) {
    return await this.moveService.getMoves(getMovesDto);
  }
}

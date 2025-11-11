import { Controller, Post } from '@nestjs/common';
import { GetUser } from '../users/decorators/get-user.decorator';
import { MoveDto } from './dto/move.dto';
import { MovesService } from './moves.service';

@Controller('moves')
export class MovesController {
  constructor(private readonly moveService: MovesService) {}
  @Post()
  async move(@GetUser() moveDto: MoveDto) {
    await this.moveService.move(moveDto);
  }
}

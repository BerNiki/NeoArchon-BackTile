import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Game } from './games.entity';

export const GetGame = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): Game => {
    const req = ctx.switchToHttp().getRequest<{ game: Game }>();
    return req.game;
  },
);

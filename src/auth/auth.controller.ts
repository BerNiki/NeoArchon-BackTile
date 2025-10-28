import { Body, Controller, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, SignInDto } from './dto/auth-credentials.dto';
import { User } from 'src/users/users.entity';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { GetUser } from 'src/users/get-user.decorator';
import { JwtAuthGuard, JwtRefreshGuard } from './jwt/jwt.authGuards';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<User> {
    return this.authService.signUp(signUpDto);
  }

  @Post('signin')
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ message: string }> {
    const { accessToken, refreshToken } =
      await this.authService.signIn(signInDto);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure:
        process.env.NODE_ENV === 'production' &&
        process.env.COOKIE_SECURE === 'true',
      sameSite:
        (process.env.COOKIE_SAMESITE as 'strict' | 'none' | 'lax') ?? 'lax',
      maxAge: 15 * 60 * 1000,
      domain: process.env.COOKIE_DOMAIN,
      path: process.env.COOKIE_PATH ?? '/',
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure:
        process.env.NODE_ENV === 'production' &&
        process.env.COOKIE_SECURE === 'true',
      sameSite:
        (process.env.COOKIE_SAMESITE as 'strict' | 'none' | 'lax') ?? 'lax',
      maxAge: 14 * 24 * 60 * 60 * 1000,
      domain: process.env.COOKIE_DOMAIN,
      path: process.env.COOKIE_PATH ?? '/',
    });
    return { message: 'logged in' };
  }

  @Patch('updatepassword')
  @UseGuards(JwtAuthGuard)
  updatePassword(
    @GetUser() user: User,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<User | null> {
    return this.authService.updatePassword(user, updatePasswordDto);
  }

  @Post('refresh')
  @UseGuards(JwtRefreshGuard)
  refreshTokens(@GetUser() user: User) {
    return this.authService.refreshTokens(user);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@GetUser() user: User) {
    return this.authService.logout(user);
  }
}

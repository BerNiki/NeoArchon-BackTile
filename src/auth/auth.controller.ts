import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, SignInDto } from './dto/auth-credentials.dto';
import { User } from 'src/users/users.entity';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { GetUser } from 'src/users/get-user.decorator';
import { JwtAuthGuard, JwtRefreshGuard } from './jwt/jwt.authGuards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<User> {
    return this.authService.signUp(signUpDto);
  }

  @Post('signin')
  signIn(@Body() signInDto: SignInDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(signInDto);
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

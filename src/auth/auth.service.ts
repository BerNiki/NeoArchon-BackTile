import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {
  EMAIL_ALREADY_EXIST_ERROR_MESSAGE,
  LOGIN_ERROR_MESSAGE,
} from 'src/CONSTS/authErrorMessages';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt/jwt.payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { email, password, username } = authCredentialsDto;
    const isExisting = await this.usersService.findByEmailSafe(email);

    if (isExisting)
      throw new ConflictException(EMAIL_ALREADY_EXIST_ERROR_MESSAGE);

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    return this.usersService.saveUser({
      username,
      email,
      passwordHash: hashedPassword,
    });
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { password, email, username } = authCredentialsDto;
    const user = await this.usersService.findByEmail(email);

    if (await bcrypt.compare(password, user.passwordHash)) {
      const payload: JwtPayload = { username, email };
      const accessToken: string = this.jwtService.sign(payload);

      return { accessToken };
    }

    throw new UnauthorizedException(LOGIN_ERROR_MESSAGE);
  }
}

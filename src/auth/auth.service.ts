import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {
  EMAIL_ALREADY_EXIST_ERROR_MESSAGE,
  INCORRECT_PASSWORD_ERROR_MESSAGE,
  LOGIN_ERROR_MESSAGE,
  NEW_PASSWORD_ERROR_MESSAGE,
  USERNAME_ALREADY_EXIST_ERROR_MESSAGE,
} from 'src/CONSTS/authErrorMessages';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { SignInDto, SignUpDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt/jwt.payload.interface';
import { JwtService } from '@nestjs/jwt';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { passwordHasher } from './utils/passwordHasher';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<User> {
    const { email, password, username } = signUpDto;

    const existingEmail = await this.usersService.findByEmailSafe(email);
    const existingUsername =
      await this.usersService.findByUsernameSafe(username);

    if (existingEmail) {
      throw new ConflictException(EMAIL_ALREADY_EXIST_ERROR_MESSAGE);
    }
    if (existingUsername) {
      throw new ConflictException(USERNAME_ALREADY_EXIST_ERROR_MESSAGE);
    }

    const hashedPassword = await passwordHasher(password);

    return this.usersService.saveUser({
      username,
      email,
      passwordHash: hashedPassword,
    });
  }

  async updatePassword(
    user: User,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<User | null> {
    const { oldPassword, newPassword } = updatePasswordDto;
    const { id, passwordHash } = user;

    if (!(await bcrypt.compare(oldPassword, passwordHash))) {
      throw new UnauthorizedException(INCORRECT_PASSWORD_ERROR_MESSAGE);
    }

    if (await bcrypt.compare(newPassword, passwordHash)) {
      throw new ConflictException(NEW_PASSWORD_ERROR_MESSAGE);
    }

    const hashedNewPassword = await passwordHasher(newPassword);

    await this.usersRepo.update(id, { passwordHash: hashedNewPassword });

    return this.usersRepo.findOneBy({ id });
  }

  async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
    const { password, email } = signInDto;
    const user = await this.usersService.findByEmail(email);

    if (await bcrypt.compare(password, user.passwordHash)) {
      const payload: JwtPayload = {
        username: user.username,
        email: user.email,
      };
      const accessToken: string = this.jwtService.sign(payload);

      return { accessToken };
    }

    throw new UnauthorizedException(LOGIN_ERROR_MESSAGE);
  }
}

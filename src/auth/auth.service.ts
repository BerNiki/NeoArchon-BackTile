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
import { verifyPassword } from './utils/passwordHasher';
import { JwtPayload } from './jwt/jwt.payload.interface';
import { JwtService } from '@nestjs/jwt';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { passwordHasher } from './utils/passwordHasher';
import { JwtSecrets } from 'src/config/config.service';
import { v4 as uuid } from 'uuid';
import { signToken } from './jwt/jwt.tokens.service';
import argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    private readonly jwtSercets: JwtSecrets,
  ) {}

  async refreshTokens(user: User) {
    const newAccessToken = this.jwtService.sign(
      {
        username: user.username,
        email: user.email,
      },
      { expiresIn: this.jwtSercets.jwtExpiration },
    );

    const newRefreshToken = this.jwtService.sign(
      { username: user.username, email: user.email },
      { expiresIn: this.jwtSercets.jwtRefreshExpiration },
    );

    const hashedNewRefreshToken = await passwordHasher(newRefreshToken);
    await this.usersService.updateUser(user.id, {
      currentHashedRefreshToken: hashedNewRefreshToken,
    });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

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

  async logout(user: User): Promise<{
    message: string;
  }> {
    await this.usersService.updateUser(user.id, {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      currentHashedRefreshToken: null as any,
    });
    return { message: 'Logged out' };
  }

  async updatePassword(
    user: User,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<User | null> {
    const { oldPassword, newPassword } = updatePasswordDto;
    const { id, passwordHash } = user;

    if (!(await verifyPassword(passwordHash, oldPassword))) {
      throw new UnauthorizedException(INCORRECT_PASSWORD_ERROR_MESSAGE);
    }
    if (await verifyPassword(passwordHash, newPassword)) {
      throw new ConflictException(NEW_PASSWORD_ERROR_MESSAGE);
    }

    const hashedNewPassword = await passwordHasher(newPassword);

    await this.usersRepo.update(id, { passwordHash: hashedNewPassword });

    return this.usersRepo.findOneBy({ id });
  }

  async signIn(
    signInDto: SignInDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { password, email } = signInDto;
    const user = await this.usersService.findByEmail(email);

    if (await verifyPassword(user.passwordHash, password)) {
      const payload: JwtPayload = {
        username: user.username,
        email: user.email,
      };

      const privateKey = await this.jwtSercets.getPrivateKey();
      const kid = this.jwtSercets.kid;
      const rtSeconds = this.jwtSercets.jwtRefreshExpiration;

      const jti = uuid();
      const refreshToken = await signToken(
        { sub: user.id },
        privateKey,
        kid,
        Number(rtSeconds),
        this.jwtSercets.issuer,
        this.jwtSercets.audience,
      );
      const jtiHash = await argon2.hash(jti);

      const accessToken: string = this.jwtService.sign(payload, {
        expiresIn: this.jwtSercets.jwtExpiration,
      });

      const hashedRefreshToken = await passwordHasher(refreshToken);

      await this.usersService.updateUser(user.id, {
        jti: jtiHash,
        currentHashedRefreshToken: hashedRefreshToken,
      });

      return { accessToken, refreshToken };
    }

    throw new UnauthorizedException(LOGIN_ERROR_MESSAGE);
  }
}

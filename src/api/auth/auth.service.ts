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
} from 'src/api/auth/consts/authErrorMessages';
import { User } from 'src/api/users/entities/users.entity';
import { UsersService } from 'src/api/users/users.service';
import { SignInDto, SignUpDto } from './dto/auth-credentials.dto';
import { verifyPassword } from './utils/passwordHasher';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { passwordHasher } from './utils/passwordHasher';
import { ConfigService } from 'src/config/config.service';
import { tokensSigner } from './utils/tokensSigner';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    private readonly ConfigService: ConfigService,
  ) {}

  async refreshTokens(user: User) {
    const { privateKey, kid, jwtExpiration, issuer, audience } =
      this.ConfigService.tokenOptions;

    const { accessToken, refreshToken, jti } = await tokensSigner(
      user.id,
      privateKey,
      kid,
      jwtExpiration,
      issuer,
      audience,
    );
    const refreshTtl = this.ConfigService.jwtRefreshExpiration;
    const expiresAt = new Date().getSeconds() + Number(refreshTtl);
    const hashedNewRefreshToken = await passwordHasher(refreshToken);

    await this.usersService.updateUser(user.id, {
      currentHashedRefreshToken: hashedNewRefreshToken,
      currentHashedRefreshTokenExpiresAt: expiresAt,
      jti: jti,
    });

    return { accessToken, refreshToken };
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
      currentHashedRefreshToken: null,
      jti: null,
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
      const { privateKey, kid, jwtExpiration, issuer, audience } =
        this.ConfigService.tokenOptions;

      const { accessToken, refreshToken, jti } = await tokensSigner(
        user.id,
        privateKey,
        kid,
        jwtExpiration,
        issuer,
        audience,
      );
      const hashedRefreshToken = await passwordHasher(refreshToken);
      const refreshTtl = this.ConfigService.jwtRefreshExpiration;
      const expiresAt = new Date().getSeconds() + Number(refreshTtl);

      await this.usersService.updateUser(user.id, {
        currentHashedRefreshToken: hashedRefreshToken,
        currentHashedRefreshTokenExpiresAt: expiresAt,
        jti: jti,
      });

      return { accessToken, refreshToken };
    }

    throw new UnauthorizedException(LOGIN_ERROR_MESSAGE);
  }
}

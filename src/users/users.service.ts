import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { USER_NOT_FOUND } from 'src/CONSTS/userServiceMessages';
import {
  EMAIL_ALREADY_EXIST_ERROR_MESSAGE,
  USERNAME_ALREADY_EXIST_ERROR_MESSAGE,
} from 'src/CONSTS/authErrorMessages';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async findById(id: string): Promise<User> {
    const user = await this.usersRepo.findOneBy({ id });

    if (!user) throw new NotFoundException(USER_NOT_FOUND);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepo.findOneBy({ email });

    if (!user) throw new NotFoundException(USER_NOT_FOUND);

    return user;
  }

  async findByEmailSafe(email: string): Promise<User | null> {
    return this.usersRepo.findOneBy({ email });
  }

  async findByUsernameSafe(username: string): Promise<User | null> {
    return this.usersRepo.findOneBy({ username });
  }

  async saveUser(user: Partial<User>): Promise<User> {
    const newUser = this.usersRepo.create(user);
    const savedUser: User = await this.usersRepo.save(newUser);

    return savedUser;
  }

  async deleteUser(id: string): Promise<User> {
    const userToDelete = await this.findById(id);

    await this.usersRepo.delete(id);
    return userToDelete;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.findById(id);

    if (updateUserDto.email) {
      const existing = await this.findByEmailSafe(updateUserDto.email);

      if (existing) {
        throw new ConflictException(EMAIL_ALREADY_EXIST_ERROR_MESSAGE);
      }
    }

    if (updateUserDto.username) {
      const existing = await this.findByUsernameSafe(updateUserDto.username);

      if (existing) {
        throw new ConflictException(USERNAME_ALREADY_EXIST_ERROR_MESSAGE);
      }
    }

    await this.usersRepo.update(id, updateUserDto);

    return this.findById(id);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_DELETED } from 'src/api/users/consts/userServiceMessages';
import { JwtGuard } from 'src/api/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  getProfile(@GetUser() user: User): User {
    return user;
  }

  @Patch('')
  updateProfile(
    @GetUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(user.id, updateUserDto);
  }

  @Delete('')
  async deleteProfile(@GetUser() user: User): Promise<{ message: string }> {
    await this.usersService.deleteUser(user.id);
    return { message: USER_DELETED };
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from './get-user.decorator';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_DELETED } from 'src/CONSTS/userServiceMessages';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.authGuards';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  getProfile(@GetUser() user: User): User {
    return user;
  }

  @Patch('profile')
  updateProfile(
    @GetUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(user.id, updateUserDto);
  }

  @Delete('profile')
  async deleteProfile(@GetUser() user: User): Promise<{ message: string }> {
    await this.usersService.deleteUser(user.id);
    return { message: USER_DELETED };
  }
}

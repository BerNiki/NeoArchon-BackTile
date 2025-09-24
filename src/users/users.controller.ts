import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('myprofile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@GetUser() user: User): User {
    return user;
  }

  @Post('updateprofile')
  @UseGuards(AuthGuard('jwt'))
  updateProfile(
    @GetUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(user.id, updateUserDto);
  }
}

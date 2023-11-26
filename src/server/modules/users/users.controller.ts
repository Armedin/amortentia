import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { UsersService } from './users.service';
import { LocalAuthGuard } from '../auth/auth.guard';
import { User } from './user.entity';
import { GetUser } from './get-user.decorator';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  async registerUser(@Body() registerUserDto: RegisterUserDto): Promise<any> {
    return this.usersService.register(registerUserDto);
  }

  @Get('/me')
  @UseGuards(LocalAuthGuard)
  getUserProfile(@GetUser() user: User) {
    return user;
  }
}

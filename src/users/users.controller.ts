import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { skipJwt } from '../decorator/jwt.decorator';

@skipJwt()
@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  // 用户注册
  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  // 用户登录
  @Post('signin')
  signIn(@Body() createUserDto: CreateUserDto) {
    return this.usersService.findOne(createUserDto);
  }
}

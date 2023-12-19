import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,

    private readonly jwtService: JwtService,
  ) {}

  // 生成token
  async genToken(result: User) {
    const payload = { sub: result.userId, username: result.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  // 注册
  async createUser(createUserDto: CreateUserDto) {
    const data = new User();

    data.username = createUserDto.username;
    data.password = createUserDto.password;

    const findRes = await this.user.findOne({
      where: { username: createUserDto.username },
    });

    if (findRes?.userId) {
      throw new HttpException('用户名已存在', HttpStatus.FORBIDDEN);
    }

    const res = await this.user.save(data);

    if (!res.userId) {
      throw new HttpException('创建失败', HttpStatus.FORBIDDEN);
    }

    return this.genToken(res);
  }

  // 登录
  async findOne(createUserDto: CreateUserDto) {
    const res = await this.user.findOne({
      where: { username: createUserDto.username },
    });

    if (!(res?.userId && res?.password === createUserDto.password)) {
      throw new HttpException('用户名或密码错误', HttpStatus.FORBIDDEN);
    }

    return this.genToken(res);
  }
}

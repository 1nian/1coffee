import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: '111',
      password: '111',
    },
    {
      userId: 2,
      username: '222',
      password: '222',
    },
  ];

  async findOne(username: string) {
    return this.users.find((user) => user.username === username);
  }
}

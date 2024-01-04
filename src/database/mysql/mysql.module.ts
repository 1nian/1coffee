import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // 数据库类型
      type: 'mysql',
      host: '82.157.233.6',
      // 端口号
      port: 3306,
      // 用户名
      username: 'root',
      // 密码
      password: '123456',
      // 数据库名称
      database: '1coffee',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      // 尝试连接数据库的次数（默认值：10）
      retryAttempts: 10,
      // 连接重试之间的延迟（毫秒）（默认值：3000）
      retryDelay: 3000,
      // 如果是 true，将自动加载实体（默认值：false）
      autoLoadEntities: true,
    }),
  ],
})
export class MysqlModule {}

import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { UsersModule } from './users/users.module';
import { MysqlModule } from './database/mysql/mysql.module';
import { CustomRequestInterceptor } from './common/response';

@Module({
  imports: [
    MysqlModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/library_database'),
    CoffeesModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CustomRequestInterceptor,
    },
  ],
})
export class AppModule {}

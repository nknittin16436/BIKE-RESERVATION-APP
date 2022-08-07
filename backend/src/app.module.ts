import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './module/user.module/user.controller';
import { UserService } from './module/user.module/user.service';


@Module({
  imports: [TypeOrmModule.forRoot({
    type :"sqlite",
    database: "restaurantReview.db",
    entities: [__dirname + "/**/*.entity{.ts,.js}"],
    synchronize: true
  }),
  ConfigModule.forRoot({ isGlobal: true,})],
  controllers: [AppController,UserController],
  providers: [AppService,UserService],
})
export class AppModule {}

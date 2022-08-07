import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './module/user.module/user.controller';
import { UserService } from './module/user.module/user.service';
import { BikeController } from './module/bike.module/bike.controller';
import { BikeService } from './module/bike.module/bike.service';
import { ReservationController } from './module/reservation.module/reservation.controller';
import { ReservationService } from './module/reservation.module/reservation.service';


@Module({
  imports: [TypeOrmModule.forRoot({
    type :"sqlite",
    database: "restaurantReview.db",
    entities: [__dirname + "/**/*.entity{.ts,.js}"],
    synchronize: true
  }),
  ConfigModule.forRoot({ isGlobal: true,})],
  controllers: [AppController,UserController,BikeController,ReservationController],
  providers: [AppService,UserService,BikeService,ReservationService],
})
export class AppModule {}

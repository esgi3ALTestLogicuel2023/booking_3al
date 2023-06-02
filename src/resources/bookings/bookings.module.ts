import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { User } from '../users/entities/user.entity';
import { Room } from '../rooms/entities/room.entity';

@Module({
  controllers: [BookingsController],
  providers: [BookingsService],
  imports: [
    TypeOrmModule.forFeature([Booking]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Room]),
  ],
})
export class BookingsModule {}

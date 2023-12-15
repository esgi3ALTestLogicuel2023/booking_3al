import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Room } from '../rooms/entities/room.entity';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createBookingDto: CreateBookingDto) {
    try {
      const booking = new Booking();
      booking.startTime = new Date(createBookingDto.startTime);
      booking.endTime = new Date(createBookingDto.endTime);
      booking.description = createBookingDto.description;
      booking.title = createBookingDto.title;
      booking.room = await this.roomRepository.findOneOrFail({
        where: { id: createBookingDto.room },
      });
      const user = await this.userRepository.find({
        where: { id: createBookingDto.userId },
      });
      if (user.length === 0) {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: 'You are not authorize to create this resource',
          },
          HttpStatus.FORBIDDEN,
        );
      } else {
        booking.user = user[0];
        this.bookingRepository.save(booking);
      }
    } catch (error) {
      throw error;
    }
  }

  findAll(): Promise<Booking[]> {
    return this.bookingRepository.find();
  }

  findOne(id: string) {
    return this.bookingRepository.findOne({ where: { id } });
  }

  async update(id: string, updateBookingDto: UpdateBookingDto) {
    try {
      const booking = await this.bookingRepository.findOne({
        where: { id: id },
        relations: ['room', 'user'],
      });
      if (booking.user.id !== updateBookingDto.userId) {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: 'You are not authorize to update this resource',
          },
          HttpStatus.FORBIDDEN,
        );
      }
      booking.startTime = new Date(updateBookingDto.startTime);
      booking.endTime = new Date(updateBookingDto.endTime);
      booking.room = await this.roomRepository.findOne({
        where: { id: updateBookingDto.room },
      });
      this.bookingRepository.save(booking);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string, userId: string) {
    try {
      const booking = await this.bookingRepository.findOne({
        where: { id },
        relations: ['user'],
      });
      if (booking.user.id !== userId) {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: 'You are not authorize to delete this resource',
          },
          HttpStatus.FORBIDDEN,
        );
      }
      this.bookingRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}

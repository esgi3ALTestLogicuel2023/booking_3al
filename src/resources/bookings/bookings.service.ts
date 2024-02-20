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

  async create(createBookingDto: CreateBookingDto, userId: string) {
    try {
      const booking = new Booking();
      booking.startTime = new Date(createBookingDto.startTime);
      booking.endTime = new Date(createBookingDto.endTime);
      booking.description = createBookingDto.description;
      booking.title = createBookingDto.title;
      booking.room = await this.roomRepository.findOneOrFail({
        where: { id: createBookingDto.room },
      });
      booking.user = await this.userRepository.findOneOrFail({
        where: { id: userId },
      });
      return this.bookingRepository.save(booking);
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

  findBookingsByUserId(userId: string) {
    return this.bookingRepository.find({
      where: { user: { id: userId } },
      relations: ['room'],
    });
  }

  async update(id: string, updateBookingDto: UpdateBookingDto) {
    try {
      const booking = await this.bookingRepository.findOne({
        where: { id: id },
        relations: ['room', 'user'],
      });
      booking.startTime = new Date(updateBookingDto.startTime);
      booking.endTime = new Date(updateBookingDto.endTime);
      booking.room = await this.roomRepository.findOne({
        where: { id: updateBookingDto.room },
      });
      return this.bookingRepository.update(id, booking);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      this.bookingRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post() // <-- POST /bookings
  create(
    @Body()
    createBookingDto: CreateBookingDto,
  ) {
    return this.bookingsService.create(createBookingDto);
  }

  @Get() // <-- GET /bookings
  findAll() {
    return this.bookingsService.findAll();
  }

  @Get(':id') // <-- GET /bookings/1
  findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateBookingDto: UpdateBookingDto,
  ) {
    return this.bookingsService.update(id, updateBookingDto);
  }

  @Delete('/:id/userId/:userId')
  remove(@Param('id') id: string, @Param('userId') userId: string) {
    return this.bookingsService.remove(id, userId);
  }
}

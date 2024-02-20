import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BookingsService } from '../bookings.service';
import { UpdateBookingDto } from '../dto/update-booking.dto';
import { UpdateUserDto } from 'src/resources/users/dto/update-user.dto';
import { User } from 'src/resources/users/entities/user.entity';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly bookingService: BookingsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user }: { user: User } = context.switchToHttp().getRequest();
    const userBooking = await this.bookingService.findBookingsByUserId(user.id);
    if (!userBooking.length) {
      return false;
    }
    return true;
  }
}

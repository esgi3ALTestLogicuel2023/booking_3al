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

  canActivate(context: ExecutionContext): boolean {
    const { user }: { user: User } = context.switchToHttp().getRequest();
    const userBooking = this.bookingService.findBookingsByUserId(user.id);
    if (!userBooking) {
      return false;
    }
    return true;
  }
}

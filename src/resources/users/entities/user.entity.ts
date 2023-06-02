import { BaseEntity } from '../../../helpers/baseEntity';
import { Booking } from '../../bookings/entities/booking.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  userName: string;

  @OneToMany(() => Booking, (booking) => booking.user)
  booking: Booking[];
}

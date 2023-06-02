import { BaseEntity } from '../../../helpers/baseEntity';
import { Booking } from '../../bookings/entities/booking.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('rooms')
export class Room extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Booking, (booking) => booking.room)
  booking: Booking[];
}

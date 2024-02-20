import { BaseEntity } from '../../../helpers/baseEntity';
import { Booking } from '../../bookings/entities/booking.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  userName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Booking, (booking) => booking.user)
  booking: Booking[];
}

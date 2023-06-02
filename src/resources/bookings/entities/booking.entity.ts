import { BaseEntity } from '../../../helpers/baseEntity';
import { Room } from '../../rooms/entities/room.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('bookings')
export class Booking extends BaseEntity {
  @ManyToOne(() => Room, (room) => room.booking)
  room: Room;

  @ManyToOne(() => User, (user) => user.booking)
  user: User;

  @Column('time')
  startTime: Date;

  @Column('time')
  endTime: Date;

  @Column('varchar')
  description: string;

  @Column()
  title: string;
}

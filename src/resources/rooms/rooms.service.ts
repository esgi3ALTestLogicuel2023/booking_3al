import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}
  create(createRoomDto: CreateRoomDto) {
    return 'This action adds a new room';
  }

  findAll(): Promise<Room[]> {
    return this.roomRepository.find();
  }

  findOne(id: string): Promise<Room> {
    return this.roomRepository.findOne({
      where: { id: id },
      relations: ['booking', 'compagny'],
    });
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}

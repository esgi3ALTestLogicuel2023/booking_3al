import { Test, TestingModule } from '@nestjs/testing';
import { BookingsService } from './bookings.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Room } from '../rooms/entities/room.entity';
import { User } from '../users/entities/user.entity';

describe('BookingsService', () => {
  let service: BookingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingsService,
        {
          provide: getRepositoryToken(Booking),
          useValue: {
            find: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({}),
          },
        },
        {
          provide: getRepositoryToken(Room),
          useValue: {
            find: jest.fn().mockResolvedValue([]),
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    service = module.get<BookingsService>(BookingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of bookings', async () => {
    const room = new Room();
    room.id = '1';
    room.name = 'Test Room';
    room.description = 'Test Room Description';
    room.createdAt = new Date();
    room.updatedAt = new Date();
    const user = new User();
    user.id = '1';
    user.userName = 'Test User';
    user.createdAt = new Date();
    user.updatedAt = new Date();

    const result: Booking[] = [
      {
        id: '1',
        title: 'Test Room',
        description: 'Test Room Description',
        room: room,
        user: user,
        startTime: new Date(),
        endTime: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    jest
      .spyOn(service['bookingRepository'], 'find')
      .mockImplementation(() => Promise.resolve(result));
    expect(await service.findAll()).toEqual(result);
  });

  it('should return a booking', async () => {
    const room = new Room();
    room.id = '1';
    room.name = 'Test Room';
    room.description = 'Test Room Description';
    room.createdAt = new Date();
    room.updatedAt = new Date();
    const user = new User();
    user.id = '1';
    user.userName = 'Test User';
    user.createdAt = new Date();
    user.updatedAt = new Date();

    const result: Booking = {
      id: '1',
      title: 'Test Room',
      description: 'Test Room Description',
      room: room,
      user: user,
      startTime: new Date(),
      endTime: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    jest
      .spyOn(service['bookingRepository'], 'findOne')
      .mockImplementation(() => Promise.resolve(result));
    expect(await service.findOne('1')).toEqual(result);
  });
});

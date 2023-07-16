import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Room } from '../src/resources/rooms/entities/room.entity';
import { User } from '../src/resources/users/entities/user.entity';
import { Booking } from '../src/resources/bookings/entities/booking.entity';
import { BookingsService } from '../src/resources/bookings/bookings.service';
import { Repository } from 'typeorm';

describe('BookingsService', () => {
  let service: BookingsService;
  let bookingRepository: Repository<Booking>;
  let userRepository: Repository<User>;
  let roomRepository: Repository<Room>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingsService,
        { provide: getRepositoryToken(Booking), useClass: Repository },
        { provide: getRepositoryToken(User), useClass: Repository },
        { provide: getRepositoryToken(Room), useClass: Repository },
      ],
    }).compile();

    service = module.get<BookingsService>(BookingsService);
    bookingRepository = module.get<Repository<Booking>>(
      getRepositoryToken(Booking),
    );
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    roomRepository = module.get<Repository<Room>>(getRepositoryToken(Room));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const testBookingDto = {
      room: 'room id',
      startTime: '2023-07-16T12:00:00',
      endTime: '2023-07-16T13:00:00',
      title: 'Test Booking',
      description: 'This is a test booking',
    };

    const testUser = new User();
    testUser.id = 'user id';
    testUser.userName = 'Test User';

    const testRoom = new Room();
    testRoom.id = 'room id';
    testRoom.name = 'Test Room';
    testRoom.description = 'This is a test room';

    it('should throw an error if the user does not exist', async () => {
      jest.spyOn(userRepository, 'find').mockResolvedValue([]);
      await expect(
        service.create(testBookingDto, 'invalid-user-id'),
      ).rejects.toThrow();
    });

    it('should throw an error if the room does not exist', async () => {
      jest.spyOn(userRepository, 'find').mockResolvedValue([testUser]);
      jest.spyOn(roomRepository, 'findOneOrFail').mockImplementation(() => {
        throw new Error();
      });
      await expect(
        service.create(testBookingDto, testUser.id),
      ).rejects.toThrow();
    });

    it('should successfully book a room for a user', async () => {
      jest.spyOn(userRepository, 'find').mockResolvedValue([testUser]);
      jest.spyOn(roomRepository, 'findOneOrFail').mockResolvedValue(testRoom);
      jest.spyOn(bookingRepository, 'save').mockResolvedValue(undefined);
      await expect(
        service.create(testBookingDto, testUser.id),
      ).resolves.not.toThrow();
      expect(userRepository.find).toBeCalledWith({
        where: { id: testUser.id },
      });
      expect(roomRepository.findOneOrFail).toBeCalledWith({
        where: { id: testBookingDto.room },
      });
      expect(bookingRepository.save).toBeCalled();
    });
  });
});

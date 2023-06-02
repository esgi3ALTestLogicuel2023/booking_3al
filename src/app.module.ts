import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './resources/users/users.module';
import { RoomsModule } from './resources/rooms/rooms.module';
import { BookingsModule } from './resources/bookings/bookings.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UsersModule,
    RoomsModule,
    BookingsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5434,
      host: '0.0.0.0',
      username: 'root',
      password: 'root',
      database: 'booking',
      migrations: [__dirname + '/database/migrations/'],
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      logging: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

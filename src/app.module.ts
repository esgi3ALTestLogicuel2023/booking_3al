import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './resources/users/users.module';
import { RoomsModule } from './resources/rooms/rooms.module';
import { BookingsModule } from './resources/bookings/bookings.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    RoomsModule,
    BookingsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: +process.env.DB_PORT,
      host: process.env.DB_HOSTNAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      migrations: [__dirname + '/database/migrations/'],
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      logging: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

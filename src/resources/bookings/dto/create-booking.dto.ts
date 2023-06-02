import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDateString, IsUUID, IsString } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({ required: true, type: 'string' })
  @IsNotEmpty()
  @IsDateString()
  startTime: string;

  @ApiProperty({ required: true, type: 'string' })
  @IsNotEmpty()
  @IsDateString()
  endTime: string;

  @ApiProperty({ required: true, type: 'string', format: 'uuid' })
  @IsNotEmpty()
  @IsUUID()
  room: string;

  @ApiProperty({ required: true, type: 'string' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ required: true, type: 'string' })
  @IsNotEmpty()
  @IsString()
  title: string;
}

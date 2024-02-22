import {
  Controller,
  Request,
  Get,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/resources/users/dto/create-user.dto';
import { UsersService } from 'src/resources/users/users.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { ApiBody } from '@nestjs/swagger';
import { Roles } from './decorators/roles.decorator';
import { Role } from './enums/role.enum';
import { RolesGuard } from './guards/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('/register')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          description: 'The user email',
        },
        password: {
          type: 'string',
          description: 'The user password',
        },
        userName: {
          type: 'string',
          description: 'The user username',
        },
        isAdmin: {
          type: 'boolean',
          description: 'The user role',
        },
      },
    },
  })
  async register(@Body() createUserDTO: CreateUserDto) {
    const user = await this.usersService.create(createUserDTO);
    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          description: 'The user email',
        },
        password: {
          type: 'string',
          description: 'The user password',
        },
      },
    },
  })
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Get('/user')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('/admin')
  getDashboard(@Request() req) {
    return {
      message: 'Admin Dashboard',
      username: req.user.userName,
      email: req.user.email,
    };
  }
}

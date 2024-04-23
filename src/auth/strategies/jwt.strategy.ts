import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import 'dotenv/config';
import { UpdateUserDto } from 'src/resources/users/dto/update-user.dto';
import { Role } from '../enums/role.enum';
import { User } from 'src/resources/users/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: User) {
    return {
      email: payload.email,
      isAdmin: payload.isAdmin,
      userName: payload.userName,
      id: payload.id,
    };
  }
}

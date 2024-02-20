import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import 'dotenv/config';
import { UpdateUserDto } from 'src/resources/users/dto/update-user.dto';
import { Role } from '../enums/role.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: UpdateUserDto) {
    return {
      email: payload.email,
      username: payload.userName,
      roles: payload.isAdmin ? [Role.Admin, Role.User] : [Role.User],
    };
  }
}

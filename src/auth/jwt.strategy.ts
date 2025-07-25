/* eslint-disable @typescript-eslint/require-await */

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { role } from 'src/users/enums/user-type.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKey:
        process.env.JWT_SECRET ??
        (() => {
          throw new Error('JWT_SECRET is not defined');
        })(),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });
  }

  async validate(payload: { email: string; sub: string; role: role }) {
    // Make sure required fields exist
    if (!payload.sub || !payload.email || !payload.role) {
      return null; // Will cause 401 Unauthorized
    }

    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}

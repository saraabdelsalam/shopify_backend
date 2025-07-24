/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKey: process.env.JWT_SECRET ?? 'myshopifysecret', // Ensure you have JWT_SECRET in your environment variables
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    // Make sure required fields exist
    if (!payload.sub || !payload.email || !payload.userType) {
      return null; // Will cause 401 Unauthorized
    }

    return {
      id: payload.sub,
      email: payload.email,
      userType: payload.userType,
    };
  }
}

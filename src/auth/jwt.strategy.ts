import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

interface JwtPayload {
  sub: string;
  email: string;
  userType: string;
}

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'myshopifysecret', // Ensure you have JWT_SECRET in your environment variables
    });
  }
  // This method is called by Passport after the JWT token is verified
  // It receives the payload from the JWT and returns the user object
  // The payload should contain the userId, email, and userType
  validate(payload: JwtPayload): {
    userId: string;
    email: string;
    userType: string;
  } {
    // Here you can add additional validation logic if needed
    return {
      userId: payload.sub,
      email: payload.email,
      userType: payload.userType,
    };
  }
}

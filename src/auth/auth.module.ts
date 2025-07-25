import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { RolesGuard } from './guards/roles.guard';
import { GqlAuthGuard } from './guards/gql-auth.guard';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret:
        process.env.JWT_SECRET ||
        'a0a146bf50fc7fa229e70440efd0a06e08340ad6a63fb538baf81a16ba806f65',
      signOptions: { expiresIn: process.env.JWT_EXPIRATION_TIME || '60m' }, // Default to 60 minutes if not set
    }),
  ],
  providers: [AuthService, JwtStrategy, GqlAuthGuard, RolesGuard, AuthResolver],
  exports: [GqlAuthGuard, RolesGuard, JwtStrategy],
})
export class AuthModule {}

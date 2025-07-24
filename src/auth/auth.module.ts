import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { RoleGuard } from './guards/role.guard';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'myshopifysecret', // Ensure you have JWT_SECRET in your environment variables
      signOptions: { expiresIn: '1d' },
    }), // Set token expiration time)
  ],
  providers: [AuthService, JwtStrategy, AuthResolver, RoleGuard],
  exports: [AuthService],
})
export class AuthModule {}

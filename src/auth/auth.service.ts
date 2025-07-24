import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/schema/users.schema';

@Injectable()
export class AuthService {
  // AuthService methods will be defined here
  constructor(
    private readonly usersService: UsersService, // Inject UsersService to access user-related methods
    private readonly jwtService: JwtService, // Inject JwtService for JWT operations
  ) {}
  // Example method for user authentication
  async validateUser(email: string, password: string): Promise<User> {
    // Logic to validate user credentials
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ payload: object; access_token: string }> {
    const user = await this.validateUser(email, password);
    const payload = {
      email: user.email,
      sub: user._id.toString(), // Ensure the user ID is a string
      UserType: user.userType,
    };
    return {
      payload, // Include the payload in the response
      access_token: this.jwtService.sign(payload), // Generate JWT token
    };
  }
}

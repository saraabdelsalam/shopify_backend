import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  // This resolver can be extended with authentication-related queries and mutations
  // For example, you can add a login mutation or a user profile query
  constructor(private authService: AuthService) {}
  @Mutation(() => String)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<string> {
    const result = await this.authService.login(email, password);
    if (!result || !result.access_token) {
      throw new Error('Login failed');
    }
    return result.access_token; // Return the JWT token as a string
  }
}

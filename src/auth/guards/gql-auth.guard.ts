import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  // This guard can be extended with additional logic if needed
  // For example, you can override the handleRequest method to customize the user retrieval process
  static getRequest(context: ExecutionContext): Request {
    const ctx = GqlExecutionContext.create(context);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log('GqlAuthGuard - getRequest:', ctx.getContext().req.user);
    return ctx.getContext<{ req: Request }>().req;
  }
}

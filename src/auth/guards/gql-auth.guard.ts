/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req || ctx.getContext();
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    if (err || !user) {
      throw err || new UnauthorizedException('Invalid token');
    }

    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    const connection = ctx.getContext().connection;

    // Attach user to all possible contexts
    if (req) {
      req.user = user;
    }
    if (connection?.context) {
      connection.context.user = user;
    }
    ctx.getContext().user = user;

    return user;
  }
}

/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;

    // For WebSocket subscriptions through graphql-ws
    if (ctx.getContext().connection) {
      return ctx.getContext().connection.context;
    }

    // Make sure headers are properly attached
    if (request && !request.headers) {
      request.headers = request?.req?.headers || {};
    }

    return request;
  }
}

/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles =
      this.reflector.get<string[]>('roles', context.getHandler()) || [];

    if (!roles.length) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    // Handle both REST and GraphQL requests
    const user = req?.user || ctx.getContext()?.connection?.context?.user;

    if (!user) {
      throw new UnauthorizedException('No authenticated user found');
    }

    if (!roles.includes(user.userType)) {
      throw new ForbiddenException(
        `User with role ${user.userType} not authorized`,
      );
    }

    return true;
  }
}

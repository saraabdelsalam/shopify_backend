import { SetMetadata } from '@nestjs/common';
import { role } from 'src/users/enums/user-type.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: role[]) => SetMetadata('roles', roles);

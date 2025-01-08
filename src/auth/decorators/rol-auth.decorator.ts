import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolProtected } from './rol-protected.decorator';
import { UserRoleGuard } from '../guards/user-role/user-role.guard';
import { Role } from '../enumarators/auth.enumarators';


/*
Developer: Johans Cuellar
Created: 01/07/2025
*/

export function RolAuth(...roles: Role[]) {

  return applyDecorators(
    RolProtected(...roles),    
    UseGuards(AuthGuard(), UserRoleGuard)
  );
}
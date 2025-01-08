import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PermissionProtected } from './permission-protected.decorator';
import { PermissionGuard } from '../guards/permission/permission.guard';
import { Permission } from '../enumarators/auth.enumarators';

/*
Developer: Johans Cuellar
Created: 01/07/2025
*/

export function PermissionAuth(...permisos: Permission[]) {

  return applyDecorators(
    PermissionProtected(...permisos),    
    UseGuards(AuthGuard(), PermissionGuard)
  );
}
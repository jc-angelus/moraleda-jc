import { SetMetadata } from '@nestjs/common';
import { Permission } from '../enumarators/auth.enumarators';

export const META_PERMISSION = 'permission'

/*
Developer: Johans Cuellar
Created: 01/07/2025
*/

export const PermissionProtected = (...args: Permission[]) => {   

    return SetMetadata(META_PERMISSION, args)

};

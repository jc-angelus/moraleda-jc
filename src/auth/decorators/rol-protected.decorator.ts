import { SetMetadata } from '@nestjs/common';
import { Role } from '../enumarators/auth.enumarators';

export const META_ROLES = 'role'

/*
Developer: Johans Cuellar
Created: 01/07/2025
*/

export const RolProtected = (...args: Role[]) => {   

    return SetMetadata(META_ROLES, args)

};

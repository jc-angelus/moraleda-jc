import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from 'src/auth/decorators/rol-protected.decorator';

/*
Developer: Johans Cuellar
Created: 01/07/2025
*/

@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector
  ){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    
    const validRol: string[] = this.reflector.get(META_ROLES, context.getHandler());

    if (!validRol || validRol.length === 0) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user;    
    var validAccess = false;

    user.role.forEach(x => {       
      
      if(validRol.includes(x.rol.name)) validAccess = true      
    
    })  

    if(validAccess) return true;

    throw new ForbiddenException(`${user.email} is not authorized for this resource.`)
   
  }
}

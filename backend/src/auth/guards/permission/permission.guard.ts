import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_PERMISSION } from 'src/auth/decorators/permission-protected.decorator';

/*
Developer: Johans Cuellar
Created: 01/07/2025
*/

@Injectable()
export class PermissionGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector
  ){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    
    const validPermission: string[] = this.reflector.get(META_PERMISSION, context.getHandler());

    if (!validPermission || validPermission.length === 0) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user;    
    var validAccess = false;

    user.role.forEach(x => {             

      x.rol.permission.forEach(y=> { 

        if(validPermission.includes(y.permission.name)) validAccess = true      

      })     
    
    })  

    if(validAccess) return true;

    throw new ForbiddenException(`${user.email} is not authorized for this resource.`)
   
  }
}

import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolAuth } from 'src/auth/decorators';
import { Role } from '../auth/enumarators/auth.enumarators';

/*
Developer: Johans Cuellar
Created: 01/08/2025
*/


@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}  
  
  @Get()
  @ApiOperation({
    summary: 'GET ALL USERS',
    description: 'Private endpoint to list all Users. It is allowed only by "admin" users.'
  })
  @ApiResponse({status: 200, description: 'Ok', isArray: true})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  @ApiResponse({status: 403, description: 'Forbidden' })
  @ApiResponse({status: 500, description: 'Server error'})
  @RolAuth(Role.Admin)  
  findAll() {
    return this.userService.findAll();
  }
}

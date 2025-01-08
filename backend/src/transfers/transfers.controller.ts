import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TransfersService } from './transfers.service';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolAuth, GetUser, PermissionAuth } from 'src/auth/decorators';
import { User } from './entities/user.entity';
import { Role, Permission } from '../auth/enumarators/auth.enumarators';
import { CreateTranferDto } from './dto/create-tranfer.dto';
import { UpdateTranferDto } from './dto/update-tranfer.dto';

/*
Developer: Johans Cuellar
Created: 01/08/2025
*/

@ApiBearerAuth()
@ApiTags('Transfers')
@Controller('transfers')
export class TransfersController {
  constructor(private readonly transfersService: TransfersService) {}

  @Post()
  @ApiOperation({
    summary: 'CREATE TRANSFER',
    description: 'Private endpoint to Create a tranfer. It is allowed only by "admin" users'
  })
  @ApiResponse({status: 201, description: 'Created', type: CreateTranferDto})
  @ApiResponse({status: 400, description: 'Bad request'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  @ApiResponse({status: 500, description: 'Server error'})
  @RolAuth(Role.Admin)
  @PermissionAuth(Permission.Create_Transfers)
  create(@Body() createUserDto: CreateTranferDto) {
    return this.transfersService.create(createUserDto);
  }
  
  @Get()
  @ApiOperation({
    summary: 'GET ALL TRANSFERS BY USER',
    description: 'Private endpoint to list all transfers. It is allowed only by "View_Transfers" permission.'
  })
  @ApiResponse({status: 200, description: 'Ok', type: CreateTranferDto, isArray: true})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  @ApiResponse({status: 403, description: 'Forbidden' })
  @ApiResponse({status: 500, description: 'Server error'})
  @RolAuth(Role.Admin, Role.User)
  @PermissionAuth(Permission.View_Transfers)
  findAll(@GetUser() user: User) {
    return this.transfersService.findAll(user);
  }

  @Patch()
  @ApiOperation({
    summary: 'UPDATE TRANSFERS BY ID',
    description: 'Private endpoint to update transfers data by Id. <ul><li>The "user" role is permitted to update only their own information.</li><li>The "admin" role has the privilege to update information of any user</li><li>Only the "admin" role can update the "role" field</li></ul>'
  })
  @ApiResponse({status: 200, description: 'Ok', type: UpdateTranferDto})
  @ApiResponse({status: 400, description: 'Bad request'})             
  @ApiResponse({status: 401, description: 'Unauthorized'})             
  @ApiResponse({status: 500, description: 'Server error'})
  @RolAuth(Role.Admin)
  @PermissionAuth(Permission.Update_Transfers)
  update(@Body() updateUserDto: UpdateTranferDto) {
    return this.transfersService.update(updateUserDto);
  }  

  @Delete(':id')
  @ApiOperation({
    summary: 'DELETE TRANSFERS BY ID',
    description: 'Private endpoint to delete user by Id. <ul><li>The "user" role is permitted to remove only their own information.</li><li>The "admin" role has the privilege to delete any user</li></ul>'
  })
  @ApiOkResponse({content: {"application/json": {example: {"message": "User deleted"}}}})
  @ApiResponse({status: 400, description: 'Bad request'})             
  @ApiResponse({status: 401, description: 'Unauthorized'})             
  @ApiResponse({status: 500, description: 'Server error'})             
  @RolAuth(Role.Admin)
  @PermissionAuth(Permission.Delete_Transfers)
  remove(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.transfersService.remove(id, user);
  } 

}

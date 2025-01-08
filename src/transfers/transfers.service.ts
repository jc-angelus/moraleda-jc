import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './entities/user.entity';
import { CreateTranferDto } from './dto/create-tranfer.dto';
import { UpdateTranferDto } from './dto/update-tranfer.dto';

/*
Developer: Johans Cuellar
Created: 01/08/2025
*/

@Injectable()
export class TransfersService {

  private readonly logger = new Logger('TransfersService');

  constructor(
    private prisma: PrismaService,
  ) { }

  async create(newTranferData: CreateTranferDto) {
    
    this.logger.log(`POST: tranfer/create: Register tranfer started`);    
      
    const vehicleUser =  !!await this.prisma.vehicles.findFirst({
      where: {      
        id: newTranferData.vehicle_id,          
        }    
    });    

    if (!vehicleUser){
      throw new BadRequestException('Vehicle not exist, please check');
    }        

    const userValid = !!await this.prisma.users.findFirst({    
        where: {      
          id: newTranferData.client_id,          
      }                
    });    
      
    if (!userValid){
       throw new BadRequestException('User not exist, please check');
    }

    const projectUser = !!await this.prisma.projects.findFirst({    
      where: {      
        id: newTranferData.project_id,          
      }    
    });      
  
    if (!projectUser){
      throw new BadRequestException('Project not exist, please check')
    }      
      
    const Organizational_UnitUser = !!await this.prisma.organizational_Units.findFirst({    
      where: {      
        id: newTranferData.organizational_unit_id,          
      }    
    });    
  
    if (!Organizational_UnitUser){
      throw new BadRequestException('Organizational Unit not exist, please check')
    }    
    
    const userProjectAccess = !!await this.prisma.usersProjects.findFirst({    
      where: {      
        id: newTranferData.client_id,
        projectId: newTranferData.project_id          
      }              
    }); 

    if (!userProjectAccess){
      throw new BadRequestException('The user does not have access to this project, please check')
    }      

    const userOrganizational_UnitAccess = !!await this.prisma.usersOrganizational_Units.findFirst({    
      where: {      
        id: newTranferData.client_id,
        organizational_unitId: newTranferData.organizational_unit_id          
      }                
    }); 

    if (!userOrganizational_UnitAccess){
      throw new BadRequestException('The user does not have access to this organizational unit, please check');
    }
    
    try {
      
      const newTranfers =  this.prisma.transfers.create({
          data: newTranferData,
          select: {
            id: true,
            type: true,
            vehicle_id: true,
            client_id: true,
            transmitter_id: true,
            project_id: true,
            organizational_unit_id: true,          
            Users_client_id: {
              select:{
                id: true,
                username: true,
                email: true,
                organizational_units: {
                  select: {
                    Organizational_Unit: true
                  }
                },
                projects: {
                  select:{
                    project: true
                  }
                }              
              }            
            }                              
          }
        })    

      return newTranfers;
      
    } catch (error) {       
      this.logger.error(`POST: error: ${error}`);      
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(user: User) {

    this.logger.log(`GET: tranfer/findAll: FindAll tranfer started`);    
    
    try {      

      const transfers = await this.prisma.transfers.findMany({    
          where: {                 
            AND: [
              {
                project_id : { in: user.projects.map(x=> x.projectId) }
              },
              {
                organizational_unit_id : { in: user.organizational_units.map(x => x.organizational_unitId) }
              },
          ],
        },    
        select: {
          id: true,
          type: true,
          vehicle_id: true,
          client_id: true,
          transmitter_id: true,
          project_id: true,
          organizational_unit_id: true,
          Users_client_id: {
            select:{
              id: true,
              username: true,
              email: true,
              organizational_units: {
                select: {
                  Organizational_Unit: true
                }
              },
              projects: {
                select:{
                  project: true
                }
              }              
            }            
          },                                        
        },
        orderBy: {
          id: "asc",
        },
                
      });
      return transfers;
    } catch (error) {
      this.logger.error(`GET: error: ${error}`);
      throw new InternalServerErrorException('Server error');
    }
        
  }  

  async update(updateTranferData: UpdateTranferDto) {

    this.logger.log(`PATCH: tranfer/update: update tranfer started`);    

    const tranferUser =  !!await this.prisma.transfers.findFirst({
      where: {      
        id: updateTranferData.id,          
        }    
    });    

    if (!tranferUser){
      throw new BadRequestException('Tranfer not exist, please check');
    }     
      
    const vehicleUser =  !!await this.prisma.vehicles.findFirst({
      where: {      
        id: updateTranferData.vehicle_id,          
        }    
    });    

    if (!vehicleUser){
      throw new BadRequestException('Vehicle not exist, please check');
    }        

    const userValid = !!await this.prisma.users.findFirst({    
        where: {      
          id: updateTranferData.client_id,          
      }                
    });    
      
    if (!userValid){
       throw new BadRequestException('User not exist, please check');
    }

    const projectUser = !!await this.prisma.projects.findFirst({    
      where: {      
        id: updateTranferData.project_id,          
      }    
    });      
  
    if (!projectUser){
      throw new BadRequestException('Project not exist, please check')
    }      
      
    const Organizational_UnitUser = !!await this.prisma.organizational_Units.findFirst({    
      where: {      
        id: updateTranferData.organizational_unit_id,          
      }    
    });    
  
    if (!Organizational_UnitUser){
      throw new BadRequestException('Organizational Unit not exist, please check')
    }

    const userProjectAccess = !!await this.prisma.usersProjects.findFirst({    
      where: {      
        id: updateTranferData.client_id,
        projectId: updateTranferData.project_id          
      }              
    }); 

    if (!userProjectAccess){
      throw new BadRequestException('The user does not have access to this project, please check')
    }      

    const userOrganizational_UnitAccess = !!await this.prisma.usersOrganizational_Units.findFirst({    
      where: {      
        id: updateTranferData.client_id,
        organizational_unitId: updateTranferData.organizational_unit_id          
      }                
    }); 

    if (!userOrganizational_UnitAccess){
      throw new BadRequestException('The user does not have access to this organizational unit, please check');
    }

    try {
      const updatedUser = await this.prisma.transfers.update({
        where: {
          id: updateTranferData.id
        },
        data: updateTranferData,
        select: {
          id: true,
          type: true,
          vehicle_id: true,
          client_id: true,
          transmitter_id: true,
          project_id: true,
          organizational_unit_id: true,
          Users_client_id: {
            select:{
              id: true,
              username: true,
              email: true,
              organizational_units: {
                select: {
                  Organizational_Unit: true
                }
              },
              projects: {
                select:{
                  project: true
                }
              }              
            }            
          }     
        }
      });
      
      return updatedUser;
        
      
    } catch (error) {      
      this.logger.error(`PATCH: error: ${error}`);
      throw new InternalServerErrorException('Server error');
    }
     
  }

  async remove(id: number, user: User) {

    this.logger.log(`DELETE: tranfer/remove: update tranfer started`);    

    const tranferUser =  await this.prisma.transfers.findFirst({
      where: {      
        id: id,          
        }    
    });    

    if (tranferUser == null){
      throw new BadRequestException('Tranfer not exist, please check');
    }   

    const userOrganizational_UnitAccess = !!await this.prisma.usersOrganizational_Units.findFirst({    
      where: {      
        id: user.id,
        organizational_unitId: tranferUser.organizational_unit_id          
      }                
    }); 

    if (!userOrganizational_UnitAccess){
      throw new BadRequestException('The user does not have access to this organizational unit, please check');
    }    

    try {
      const deletedTranfer = await this.prisma.transfers.delete({
        where: {
          id: id
        }
      });
      
      this.logger.warn(`DELETE: ${JSON.stringify(deletedTranfer)}`);
      return { message: "Tranfer deleted" }
      
    } catch (error) {      
      this.logger.error(`DELETE: error: ${error}`);
      throw new InternalServerErrorException('Server error');
    }
  }  
}


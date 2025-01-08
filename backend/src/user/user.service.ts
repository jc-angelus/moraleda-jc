import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

/*
Developer: Johans Cuellar
Created: 01/08/2025
*/

@Injectable()
export class UserService {

  private readonly logger = new Logger('UserService');

  constructor(
    private prisma: PrismaService,

  ) { }  

  async findAll() {
    
    try {
      let users = await this.prisma.users.findMany({        
        select: {
          id: true,
          username: true,          
          email: true,          
          createdAt: true, 
          role: {
            select:{
              rol: {                
                include:{
                  permission: {
                    select: {
                      permission: {
                        select: {
                          name: true
                        }
                      }
                    }
                  }
                }                
              }                            
            }            
          },
          projects: {
            select: {
              project : true
            }
          },
          organizational_units: {
            select: {
              Organizational_Unit: true
            }
          }
        }  
      });
      return users;
    } catch (error) {
      this.logger.error(`GET: error: ${error}`);
      throw new InternalServerErrorException('Server error');
    }        
  } 
}


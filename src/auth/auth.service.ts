import { BadRequestException, Injectable, InternalServerErrorException, Logger  } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { PrismaService } from 'src/prisma/prisma.service';

/*
Developer: Johans Cuellar
Created: 01/07/2025
*/

@Injectable()
export class AuthService {

  private readonly logger = new Logger('AuthService');

  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService

  ) { }  

  async loginUser(email: string, password: string): Promise<any> {    
    this.logger.log(`POST: auth/login: Login iniciado: ${email}`);
    let user;
    try {
      user = await this.prisma.users.findUniqueOrThrow({
        where: {
          email
        },
        select: {
          id: true,
          username: true,
          password_hash: true,
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
        }      
      });

    } catch (error) {
      this.logger.error(`POST: auth/login: error: ${error}`);
      throw new BadRequestException('Error de credenciales');
    }
        
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      throw new BadRequestException('Error de credenciales');
    }
    
    delete user.password_hash;
    
    this.logger.log(`POST: auth/login: Usuario aceptado: ${user.email}`);
    return {
      user,
      token: this.getJwtToken({
        id: user.id,
      })
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}






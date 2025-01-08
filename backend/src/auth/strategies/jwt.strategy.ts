import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { PrismaService } from "src/prisma/prisma.service";

/*
Developer: Johans Cuellar
Created: 01/07/2025
*/

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    
    constructor(
        private prisma: PrismaService,
        private readonly configService: ConfigService
    ) {
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: JwtPayload): Promise<any> {

        const { id } = payload;

        try {
            const user = await this.prisma.users.findUnique({
                where: {id},
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
                  organizational_units: true,
                  projects: true                   
                }
            });
            return user;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }                
    }
}
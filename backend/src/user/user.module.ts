import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';

/*
Developer: Johans Cuellar
Created: 01/08/2025
*/

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    AuthModule,
    PrismaModule,
  ],
  exports: []
})
export class UserModule {}

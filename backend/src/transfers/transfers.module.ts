import { Module } from '@nestjs/common';
import { TransfersService } from './transfers.service';
import { TransfersController } from './transfers.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';

/*
Developer: Johans Cuellar
Created: 01/08/2025
*/

@Module({
  controllers: [TransfersController],
  providers: [TransfersService],
  imports: [
    AuthModule,
    PrismaModule,
  ],
  exports: []
})
export class TransfersModule {}

import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

/*
Developer: Johans Cuellar
Created: 01/07/2025
*/

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
}

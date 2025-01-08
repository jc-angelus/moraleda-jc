import { CreateTranferDto } from "./create-tranfer.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

/*
Developer: Johans Cuellar
Created: 01/07/2025
*/

export class UpdateTranferDto extends CreateTranferDto {
 
    @ApiProperty({
        description: "Id Transfer",
        nullable: false,
        required: true,                
    })
    @IsNumber()
    id: number;    
}

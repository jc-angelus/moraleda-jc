import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber } from "class-validator";

/*
Developer: Johans Cuellar
Created: 01/07/2025
*/

export class CreateTranferDto {    

    @ApiProperty({
        description: "Type tranfer",        
        nullable: false,
        required: true,
        type: "string",        
    })
    @IsString()    
    type: string;

    @ApiProperty({
        description: "Id Vehicle",
        nullable: false,
        required: true,                
    })
    @IsNumber()
    vehicle_id: number;

    @ApiProperty({
        description: "Id Client",
        nullable: false,
        required: true,                
    })
    @IsNumber()
    client_id: number;

    @ApiProperty({
        description: "Id Transmitter",
        nullable: false,
        required: true,                
    })
    @IsNumber()
    transmitter_id: number;

    @ApiProperty({
        description: "Id Project",
        nullable: false,
        required: true,                
    })
    @IsNumber()
    project_id: number;

    @ApiProperty({
        description: "Id Organizational Unit Id",
        nullable: false,
        required: true,                
    })
    @IsNumber()
    organizational_unit_id: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';


/*
Developer: Johans Cuellar
Created: 01/07/2025
*/

export class LoginUserDto {

    @ApiProperty({
        description: "Email",
        nullable: false,
        required: true,
        type: "string",
        example: "youremail@example.com",
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: "User Password",
        nullable: false,
        required: true,
        type: "string",
        example: "Password123",
    })
    @IsString()
    password: string;

};

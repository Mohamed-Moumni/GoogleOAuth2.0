import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class createUserDto{
    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    firstname: string
    
    @IsString()
    @IsNotEmpty()
    lastname: string

    @IsString()
    picture: string
}
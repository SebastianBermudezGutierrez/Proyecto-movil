import { IsEmail, IsOptional, IsString } from "class-validator"

export class CreateUserDto {

@IsString()
  name:           string
@IsString()
  identification: string 
@IsString()
@IsEmail()   
  email:          string   
@IsString()
  password:       string
@IsString()
@IsOptional()
  token?:          string
}

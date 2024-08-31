import { ApiProperty } from '@nestjs/swagger';

export class CreateBrandDto {
  @ApiProperty({ example: 'Brand Name' })
  name: string;

  @ApiProperty({ example: 'Brand Tag Line' })
  tag_line: string;
}
/**
 * Question: Why do we need DTOs and interfaces both in NestJS?
 * Basically, in rest API, we have two types of operation, One is Input and Another is Output. which is Request and Response

During response, we don't need to validate the return value. We just need to pass data based on the interface

But in request, we need to validate the body

for example, you want to create a user. Then the request body might be something like this

const body = {
 name: "Test Name",
 email: "test@gmail.com",
 phone: "0393939",
 age: 25
}
so during request we need to validate email, phone number or password is matched regex etc.

so in DTO we can do all validation

Here is one of my DTO example
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterUserRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class LoginUserRequest {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
And here is the interface example
import { UserRole } from './user.schema';

export interface UserType {
  _id?: string;
  email?: string;
  name?: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}

Hope you understand.

Thanks
 */

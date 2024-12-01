import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  //   Query,
  ParseUUIDPipe,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // GET /users/:userId - Get details of a specific user
  @Get(':userId')
  findOne(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.usersService.findOne(userId);
  }

  // POST /users - Create a new user
  @Post()
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // PUT /users/:userId - Update details of a specific user
  @Patch(':userId')
  update(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(userId, updateUserDto);
  }

  // DELETE /users/:userId - Delete a specific user
  @Delete(':userId')
  delete(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.usersService.delete(userId);
  }
}

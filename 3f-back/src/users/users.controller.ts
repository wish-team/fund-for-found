import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
// Assuming you have this guard

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // GET /users/:userId - Get details of a specific user
  // Protect this route with SupabaseAuthGuard
  @Get()
  findOne(@Req() request: any) {
    const userId = request.user?.brandId;
    return this.usersService.findOne(userId);
  }

  // PATCH /users/:userId - Update details of a specific user
  // Protect this route with SupabaseAuthGuard
  @Patch()
  update(
    @Req() request: any,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    const userId = request.user?.brandId;
    return this.usersService.update(userId, updateUserDto);
  }

  // DELETE /users/:userId - Delete a specific user
  // Protect this route with SupabaseAuthGuard
  @Delete()
  delete(@Req() request: any) {
    const userId = request.user?.brandId;
    return this.usersService.delete(userId);
  }
}

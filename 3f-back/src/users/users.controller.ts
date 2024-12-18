import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Req,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { SupabaseAuthGuard } from 'src/guards/owner.guard'; // Assuming you have this guard

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // GET /users/:userId - Get details of a specific user
  @UseGuards(SupabaseAuthGuard) // Protect this route with SupabaseAuthGuard
  @Get()
  findOne(@Req() request: any) {
    const userId = request.user?.id;
    return this.usersService.findOne(userId);
  }

  // PATCH /users/:userId - Update details of a specific user
  @UseGuards(SupabaseAuthGuard) // Protect this route with SupabaseAuthGuard
  @Patch()
  update(
    @Req() request: any,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    const userId = request.user?.id;
    return this.usersService.update(userId, updateUserDto);
  }

  // DELETE /users/:userId - Delete a specific user
  @UseGuards(SupabaseAuthGuard) // Protect this route with SupabaseAuthGuard
  @Delete()
  delete(@Req() request: any) {
    const userId = request.user?.id;
    return this.usersService.delete(userId);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
// Assuming you have this guard

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // GET /user/:userId - Get details of a specific user
  @Get()
  findOne(@Req() request: any) {
    const userId = request.user?.brandId;
    return this.userService.findOne(userId);
  }

  // PATCH /user/:userId - Update details of a specific user
  @Patch()
  update(
    @Req() request: any,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    const userId = request.user?.brandId;
    return this.userService.update(userId, updateUserDto);
  }

  // DELETE /user/:userId - Delete a specific user
  @Delete()
  delete(@Req() request: any) {
    const userId = request.user?.brandId;
    return this.userService.delete(userId);
  }
}

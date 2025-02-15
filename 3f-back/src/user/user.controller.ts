import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { MyAuthGuard } from 'src/auth/guards/supabase.auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // GET /user/:userId - Get details of a specific user
  @Get(':userId')
  findOne(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.userService.findOne(userId);
  }

  // PATCH /user/:userId - Update details of a specific user
  @UseGuards(MyAuthGuard)
  @Patch()
  update(
    @Req() request: any,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    const userId = request.user.id;
    return this.userService.update(userId, updateUserDto);
  }

  // DELETE /user/:userId - Delete a specific user
  @UseGuards(MyAuthGuard)
  @Delete()
  delete(@Req() request: any) {
    const userId = request.user.id;
    return this.userService.delete(userId);
  }
}

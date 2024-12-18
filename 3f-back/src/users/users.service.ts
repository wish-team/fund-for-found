import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { supabase } from '../../utils/supabase/client'; // Import your Supabase client

@Injectable()
export class UsersService {
  // Get details of a specific user
  async findOne(userId: string) {
    const { data, error } = await supabase
      .from('USER') // Updated table name
      .select('*')
      .eq('USER_ID', userId)
      .single();

    if (error || !data) {
      throw new NotFoundException('User not found');
    }

    return data;
  }

  // Update details of a specific user
  async update(userId: string, updateUserDto: UpdateUserDto) {
    const { data, error } = await supabase
      .from('USER') // Updated table name
      .update({
        USER_NAME: updateUserDto.user_name,
        USER_LAST_NAME: updateUserDto.user_last_name,
        PHONE_NUMBER: updateUserDto.phone_number,
        COUNTRY: updateUserDto.country,
      })
      .eq('USER_ID', userId)
      .select()
      .single();

    if (error || !data) {
      throw new NotFoundException('User not found or update failed');
    }

    return data;
  }

  // Delete a specific user
  async delete(userId: string) {
    const { error } = await supabase
      .from('USER') // Updated table name
      .delete()
      .eq('USER_ID', userId);

    if (error) {
      throw new NotFoundException('User not found or delete failed');
    }

    return { message: 'User deleted successfully' };
  }
}

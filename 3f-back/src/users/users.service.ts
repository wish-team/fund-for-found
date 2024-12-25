import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { supabase } from '../../utils/supabase/client'; // Import your Supabase client

@Injectable()
export class UsersService {
  // Get details of a specific user
  async findOne(userId: string) {
    const { data, error } = await supabase
      .from('user') // Updated table name
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error || !data) {
      throw new NotFoundException('User not found');
    }

    return data;
  }

  // Update details of a specific user
  async update(userId: string, updateUserDto: UpdateUserDto) {
    const { data, error } = await supabase
      .from('user') // Updated table name
      .update({
        user_first_name: updateUserDto.user_name,
        user_last_name: updateUserDto.user_last_name,
        phone_number: updateUserDto.phone_number,
        country: updateUserDto.country,
      })
      .eq('user_id', userId)
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
      .from('user') // Updated table name
      .delete()
      .eq('user_id', userId);

    if (error) {
      throw new NotFoundException('User not found or delete failed');
    }

    return { message: 'User deleted successfully' };
  }
}

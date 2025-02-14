import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly supabaseClient: SupabaseClient) {}
  // Get details of a specific user
  async findOne(userId: string) {
    const { data, error } = await this.supabaseClient
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
    const { data, error } = await this.supabaseClient
      .from('user') // Updated table name
      .update({
        user_first_name: updateUserDto.user_first_name,
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
    const { error } = await this.supabaseClient
      .from('user') // Updated table name
      .delete()
      .eq('user_id', userId);

    if (error) {
      throw new NotFoundException('User not found or delete failed');
    }

    return { message: 'User deleted successfully' };
  }
}

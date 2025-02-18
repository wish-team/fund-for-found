import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly supabaseClient: SupabaseClient) {}

  // GET /user/:userId - Get details of a specific user
  async findOne(userId: string) {
    const { data, error } = await this.supabaseClient
      .from('user')
      .select('user_id, user_first_name, user_last_name, country, user_image')
      .eq('user_id', userId)
      .single();

    if (error || !data) {
      throw new NotFoundException('User not found');
    }

    return data;
  }

  // GET /user - Get me
  async findMe(userId: string) {
    const { data, error } = await this.supabaseClient
      .from('user')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error || !data) {
      throw new NotFoundException('User not found');
    }

    return data;
  }

  // PATCH /user/:userId - Update details of a specific user
  async update(userId: string, updateUserDto: UpdateUserDto) {
    const { data, error } = await this.supabaseClient
      .from('user') // Updated table name
      .update({
        user_first_name: updateUserDto.user_first_name,
        user_last_name: updateUserDto.user_last_name,
        phone_number: updateUserDto.phone_number,
        country: updateUserDto.country,
      })
      .eq('user_id', userId);

    if (error) {
      throw new NotFoundException('User not found or update failed');
    }

    return data ?? { message: 'User created successfully' };
  }

  // DELETE /user/:userId - Delete a specific user
  async delete(userId: string) {
    const { error } = await this.supabaseClient
      .from('user')
      .delete()
      .eq('user_id', userId);

    if (error) {
      throw new NotFoundException('User not found or delete failed');
    }

    return { message: 'User deleted successfully' };
  }
}

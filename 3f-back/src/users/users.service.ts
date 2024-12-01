import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
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

  // Create a new user
  async create(createUserDto: CreateUserDto) {
    const { data, error } = await supabase
      .from('USER') // Updated table name
      .insert([
        {
          USER_NAME: createUserDto.user_name,
          USER_LAST_NAME: createUserDto.user_last_name,
          PHONE_NUMBER: createUserDto.phone_number,
          COUNTRY: createUserDto.country,
          EMAIL: createUserDto.email,
          PASSWORD: createUserDto.password,
          CREATED_AT: new Date(),
          UPDATED_AT: new Date(),
        },
      ])
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
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
        EMAIL: updateUserDto.email,
        PASSWORD: updateUserDto.password,
        UPDATED_AT: new Date(),
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

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class BrandService {
  constructor(private readonly supabaseClient: SupabaseClient) {}
  // GET /brand - Get a list of all brand
  async findAll() {
    const { data, error } = await this.supabaseClient.from('brand').select('*');
    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  // GET /brand/:id - Get details of a specific brand
  async findOne(id: string) {
    const { data, error } = await this.supabaseClient
      .from('brand')
      .select()
      .eq('brand_id', id)
      .single();

    if (error || !data) {
      throw new NotFoundException('Brand not found');
    }

    return data;
  }

  async create(createBrandDto: CreateBrandDto & { owner_id: string }) {
    await this.supabaseClient.auth.setSession({
      access_token:
        'eyJhbGciOiJIUzI1NiIsImtpZCI6IlhkMXZuVDd2SElJWTNiekgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3h5cHRjeGdwanBqeWR2Y293ZnJ3LnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiI5YjljMDMwOS1hN2YzLTQ4ZWItYjI5My01MjFlM2Q0NDg4NTAiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzM1NTYyMDQ5LCJpYXQiOjE3MzU1NTg0NDksImVtYWlsIjoiYmFyZGlhYTgzMEBnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6Imdvb2dsZSIsInByb3ZpZGVycyI6WyJnb29nbGUiXX0sInVzZXJfbWV0YWRhdGEiOnsiYXZhdGFyX3VybCI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0xBSU9kUU9jVzVDOTY5VHZQQXFyeTBtbWtCQURjNHpha2RTZHBaTk9GeFNaN0tMaU09czk2LWMiLCJlbWFpbCI6ImJhcmRpYWE4MzBAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZ1bGxfbmFtZSI6IkJhcmRpYSBBa2JhcmkiLCJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYW1lIjoiQmFyZGlhIEFrYmFyaSIsInBob25lX3ZlcmlmaWVkIjpmYWxzZSwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0xBSU9kUU9jVzVDOTY5VHZQQXFyeTBtbWtCQURjNHpha2RTZHBaTk9GeFNaN0tMaU09czk2LWMiLCJwcm92aWRlcl9pZCI6IjEwNDI2MTA4MTQzMzIwNTg0NjQ5MCIsInN1YiI6IjEwNDI2MTA4MTQzMzIwNTg0NjQ5MCJ9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6Im9hdXRoIiwidGltZXN0YW1wIjoxNzM1NTU4NDQ5fV0sInNlc3Npb25faWQiOiJjNGZkMTg4Mi1hN2ExLTQxMmMtYjIzNC04YWQzMjRkYjYwYjIiLCJpc19hbm9ueW1vdXMiOmZhbHNlfQ.SUletB6qig2ew_WpXdoETjXaUtOAek59H9jF1lLAhzo',
      refresh_token: 'sEVGOf9y5sdiJJFT76x8SPsjwF3sQ0TJ',
    });
    const res = (await this.supabaseClient.auth.getUser()).data.user.id;
    const { data, error } = await this.supabaseClient.from('brand').insert([
      {
        owner_id: res,
        brand_name: createBrandDto.brand_name,
        brand_image: createBrandDto.brand_image,
      },
    ]);

    if (error) {
      throw new Error(error.message);
    }

    return data ?? { message: 'Brand createed successfully ' };
  }

  // PUT /brand/:id - Update a specific brand
  async update(id: string, updateBrandDto: UpdateBrandDto) {
    await this.supabaseClient.auth.setSession({
      access_token:
        'eyJhbGciOiJIUzI1NiIsImtpZCI6IlhkMXZuVDd2SElJWTNiekgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3h5cHRjeGdwanBqeWR2Y293ZnJ3LnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiI5YjljMDMwOS1hN2YzLTQ4ZWItYjI5My01MjFlM2Q0NDg4NTAiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzM1NTYyMDQ5LCJpYXQiOjE3MzU1NTg0NDksImVtYWlsIjoiYmFyZGlhYTgzMEBnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6Imdvb2dsZSIsInByb3ZpZGVycyI6WyJnb29nbGUiXX0sInVzZXJfbWV0YWRhdGEiOnsiYXZhdGFyX3VybCI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0xBSU9kUU9jVzVDOTY5VHZQQXFyeTBtbWtCQURjNHpha2RTZHBaTk9GeFNaN0tMaU09czk2LWMiLCJlbWFpbCI6ImJhcmRpYWE4MzBAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZ1bGxfbmFtZSI6IkJhcmRpYSBBa2JhcmkiLCJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYW1lIjoiQmFyZGlhIEFrYmFyaSIsInBob25lX3ZlcmlmaWVkIjpmYWxzZSwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0xBSU9kUU9jVzVDOTY5VHZQQXFyeTBtbWtCQURjNHpha2RTZHBaTk9GeFNaN0tMaU09czk2LWMiLCJwcm92aWRlcl9pZCI6IjEwNDI2MTA4MTQzMzIwNTg0NjQ5MCIsInN1YiI6IjEwNDI2MTA4MTQzMzIwNTg0NjQ5MCJ9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6Im9hdXRoIiwidGltZXN0YW1wIjoxNzM1NTU4NDQ5fV0sInNlc3Npb25faWQiOiJjNGZkMTg4Mi1hN2ExLTQxMmMtYjIzNC04YWQzMjRkYjYwYjIiLCJpc19hbm9ueW1vdXMiOmZhbHNlfQ.SUletB6qig2ew_WpXdoETjXaUtOAek59H9jF1lLAhzo',
      refresh_token: 'sEVGOf9y5sdiJJFT76x8SPsjwF3sQ0TJ',
    });
    // const res = (await this.supabaseClient.auth.getUser()).data.user.id;
    // console.log(res);
    const { data, error } = await this.supabaseClient
      .from('brand')
      .update([
        {
          brand_name: updateBrandDto.brand_name,
          brand_image: updateBrandDto.brand_image,
        },
      ])
      .eq('brand_id', id);

    if (error || !data) {
      throw new NotFoundException('Brand not found or update failed');
    }
    return 'data';
  }

  // DELETE /brand/:id - Delete a specific brand
  async delete(id: string) {
    // Try to delete the brand
    const { data, error } = await this.supabaseClient
      .from('brand')
      .delete()
      .eq('brand_id', id);

    if (error || !data) {
      throw new NotFoundException('Brand not found or delete failed');
    }

    return data;
  }
}

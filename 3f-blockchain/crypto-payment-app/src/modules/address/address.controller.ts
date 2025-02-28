import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

// Assuming you have a Supabase service to interact with the DB
import { SupabaseService } from '../supabase/supabase.service';
@Controller('address')
export class AddressController {
  constructor(private readonly supabaseService: SupabaseService) {}

  /**
   * GET /address/wallets
   * Retrieves all the generated wallets, optionally filtering by coin_type, network, and brand_id.
   */
  @Get('wallets')
  async getAllWallets(
    @Query('coin_type') coinType?: string, // Optional query parameter for coin type
    @Query('network') network?: string, // Optional query parameter for network
    @Query('brand_id') brandId?: number, // Optional query parameter for brand_id
  ) {
    try {
      const supabase = this.supabaseService.getClient();

      // Start with the basic query
      let query = supabase
        .from('transactions')
        .select(
          'brand_id, unique_index, coin_type, network, generated_address, generated_private_key',
        );

      // Apply filters based on provided query parameters
      if (coinType) {
        query = query.eq('coin_type', coinType); // Filter by coin type (e.g., 'eth', 'btc')
      }

      if (network) {
        query = query.eq('network', network); // Filter by network (e.g., 'mainnet', 'ropsten')
      }

      if (brandId) {
        query = query.eq('brand_id', brandId); // Filter by brand_id
      }

      // Execute the query
      const { data, error } = await query;

      // Check for any error in the query execution
      if (error) {
        throw new HttpException(
          'Error fetching wallets: ' + error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      // Check if no data was found
      if (!data || data.length === 0) {
        throw new HttpException(
          'No wallets found matching the provided filters.',
          HttpStatus.NOT_FOUND,
        );
      }

      // Return the filtered wallets
      return {
        success: true,
        wallets: data,
        message: 'Wallets retrieved successfully',
      };
    } catch (error) {
      // Handle any unexpected errors
      throw new HttpException(
        'Error retrieving wallets: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

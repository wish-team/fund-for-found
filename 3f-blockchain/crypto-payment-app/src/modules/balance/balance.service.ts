import { Injectable } from '@nestjs/common';
import { AddressService } from '../address/address.service'; // Import AddressService
// import {CoinService} from
@Injectable()
export class BalanceService {
  constructor(
    private readonly addressService: AddressService,
    // private coinService: CoinService, // Inject CoinService
  ) {}

  async getMasterWalletBalance(coin: string, address: string): Promise<string> {
    // Call the AddressService's getMasterWalletBalance and pass the coin and address
    const balance = await this.addressService.getMasterWalletBalance(
      address,
      coin,
    );
    return balance;
  }

  // Assuming you have some logic to track incoming and outgoing transactions
  async getPlatformBalance(): Promise<{ incoming: string; outgoing: string }> {
    // Logic to calculate incoming and outgoing balances
    // Example structure, you need to implement your own logic to fetch these values
    const incoming = '1000'; // Example incoming value
    const outgoing = '200'; // Example outgoing value

    return {
      incoming,
      outgoing,
    };
  }
}

import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { CoinService } from '../coin/coin.service'; // Assuming you have a coin service for various coin types
// import { BitcoinStrategy } from '../coin/strategy/bitcoin-coin.strategy'; // Assuming a Bitcoin service for BTC

@Injectable()
export class BalanceService {
  constructor(
    private readonly coinService: CoinService,
    // private readonly BitcoinStrategy: BitcoinStrategy, // Inject Bitcoin service for BTC balance
  ) {}

  /**
   * Get the master wallet balance for the specific coin.
   * @param coin The coin type (e.g., 'eth', 'btc')
   * @param address The address to check
   * @returns The balance as a string
   */
  async getMasterWalletBalance(coin: string, address: string): Promise<string> {
    switch (coin.toLowerCase()) {
      case 'eth':
        return this.getEthereumBalance(address);
      case 'btc':
        return this.getBitcoinBalance(address);
      default:
        throw new Error(`Unsupported coin type: ${coin}`);
    }
  }

  /**
   * Get the platform balance for a specific coin type.
   * @param coin The coin type (e.g., 'eth', 'btc')
   * @returns Incoming and outgoing balances as a string
   */
  async getPlatformBalance(
    coin: string,
  ): Promise<{ incoming: string; outgoing: string }> {
    switch (coin.toLowerCase()) {
      case 'eth':
        return this.getEthereumPlatformBalance();
      case 'btc':
        return this.getBitcoinPlatformBalance();
      default:
        throw new Error(`Unsupported coin type: ${coin}`);
    }
  }

  private async getEthereumBalance(address: string): Promise<string> {
    const provider = new ethers.JsonRpcProvider(process.env.ETHEREUM_RPC_URL);
    const balance = await provider.getBalance(address);
    return ethers.formatEther(balance);
  }

  private async getBitcoinBalance(address: string): Promise<string> {
    const btcStrategy = this.coinService.getStrategy('btc');
    return btcStrategy.getBalance(address);
  }

  private async getEthereumPlatformBalance(): Promise<{
    incoming: string;
    outgoing: string;
  }> {
    // For simplicity, we will just return mock data. Implement this logic as needed.
    return { incoming: '100', outgoing: '50' }; // Example
  }

  private async getBitcoinPlatformBalance(): Promise<{
    incoming: string;
    outgoing: string;
  }> {
    // Similar to Ethereum, you can implement logic to fetch BTC platform balance
    return { incoming: '5', outgoing: '2' }; // Example
  }
}

import { Injectable } from '@nestjs/common';
import { CoinService } from '../coin/coin.service'; // Inject CoinService
import { ethers } from 'ethers';

@Injectable()
export class AddressService {
  private provider: ethers.JsonRpcProvider;

  constructor(
    private coinService: CoinService, // Inject CoinService
  ) {
    const rpcUrl = process.env.ETH_RPC_URL; // Infura/Alchemy RPC URL

    if (!rpcUrl) {
      throw new Error('Ethereum RPC URL not found in environment variables.');
    }

    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    console.log('Ethereum Provider Initialized');
  }

  async getMasterWalletBalance(address: string, coin: string): Promise<string> {
    try {
      const coinStrategy = this.coinService.getStrategy(coin); // Get the coin strategy
      const balance = await coinStrategy.getBalance(address);
      console.log(`Balance for ${coin} address ${address}: ${balance}`);
      return balance;
    } catch (error) {
      console.error('Error fetching master wallet balance:', error.message);
      throw new Error('Failed to fetch master wallet balance.');
    }
  }

  async generateDerivedAddress(coin: string, index: number): Promise<string> {
    try {
      const coinStrategy = this.coinService.getStrategy(coin); // Get the coin strategy
      const derivedAddress = coinStrategy.generateAddress(
        process.env.MASTER_MNEMONIC,
        index,
      );
      console.log(
        `Generated Address for ${coin} at index ${index}: ${derivedAddress}`,
      );
      return derivedAddress;
    } catch (error) {
      console.error('Error generating derived address:', error.message);
      throw new Error(`Failed to generate address for ${coin}.`);
    }
  }
}

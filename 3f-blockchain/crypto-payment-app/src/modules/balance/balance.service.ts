import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { CoinService } from '../coin/coin.service';

@Injectable()
export class BalanceService {
  private provider: ethers.JsonRpcProvider;

  constructor(
    private readonly coinService: CoinService,
  ) {
    if (!process.env.BLOCKCHAIN_RPC_URL) {
      throw new Error('BLOCKCHAIN_RPC_URL is not defined');
    }
    this.provider = new ethers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL);
  }

  async getMasterWalletBalance(coin: string, address: string): Promise<string> {
    try {
      switch (coin.toLowerCase()) {
        case 'eth':
          const balance = await this.provider.getBalance(address);
          return ethers.formatEther(balance);
        case 'btc':
          const btcStrategy = this.coinService.getStrategy('btc');
          return btcStrategy.getBalance(address);
        default:
          throw new Error(`Unsupported coin type: ${coin}`);
      }
    } catch (error) {
      console.error('Error fetching master wallet balance:', error);
      throw new Error('Failed to fetch master wallet balance');
    }
  }

  async getWalletBalance(address: string): Promise<string> {
    try {
      const balance = await this.provider.getBalance(address);
      return ethers.formatEther(balance);
    } catch (error) {
      console.error('Error fetching wallet balance:', error);
      throw new Error('Failed to fetch wallet balance');
    }
  }

  async estimateGasCost(from: string, to: string, value: bigint): Promise<bigint> {
    try {
      const feeData = await this.provider.getFeeData();
      const gasPrice = feeData.gasPrice ?? 
        (feeData.maxFeePerGas ? feeData.maxFeePerGas / 2n : 
        ethers.parseUnits('20', 'gwei'));
      
      const gasLimit = 21000n; // Standard ETH transfer
      return gasLimit * gasPrice;
    } catch (error) {
      console.error('Error estimating gas cost:', error);
      throw new Error('Failed to estimate gas cost');
    }
  }

  async getPlatformBalance(coin: string): Promise<{ incoming: string; outgoing: string }> {
    // This is a placeholder. Implement actual platform balance tracking as needed
    return { incoming: '0', outgoing: '0' };
  }
}
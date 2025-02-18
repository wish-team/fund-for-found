import { Body, Controller, Get, Param } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { ethers } from 'ethers';

@Controller('balance')
export class BalanceController {
  private provider: ethers.JsonRpcProvider;

  constructor(private readonly balanceService: BalanceService) {}

  /**
   * Endpoint to get the master wallet balance for a specific coin type
   * @param coin The coin type (e.g., 'eth', 'btc', etc.)
   */
  @Get('wallet-balance/:coin')
  async getMasterWalletBalance(
    @Param('coin') coin: string, // The coin type to check balance for
  ): Promise<string> {
    const mnemonic = process.env.MASTER_MNEMONIC;
    if (!mnemonic) {
      throw new Error('MASTER_MNEMONIC is not set');
    }

    // Determine the appropriate provider based on the coin type
    const wallet = ethers.HDNodeWallet.fromPhrase(mnemonic);
    const mainAddress = wallet.address;

    return this.balanceService.getMasterWalletBalance(coin, mainAddress);
  }

  /**
   * Endpoint to get the platform balance (incoming and outgoing) for a specific coin type
   * @param coin The coin type (e.g., 'eth', 'btc', etc.)
   */
  @Get('platform-balance/:coin')
  async getPlatformBalance(
    @Param('coin') coin: string, // The coin type to get platform balance for
  ): Promise<{ incoming: string; outgoing: string }> {
    return this.balanceService.getPlatformBalance(coin);
  }
}

import { Body, Controller, Get } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { ethers } from 'ethers';

@Controller('balance')
export class BalanceController {
  private provider: ethers.JsonRpcProvider;

  constructor(private readonly balanceService: BalanceService) {}

  // Endpoint to get the master wallet balance
  @Get('wallet-balance')
  async getMasterWalletBalance(@Body('coin') coin: string): Promise<string> {
    const mnemonic = process.env.MASTER_MNEMONIC;
    const wallet = ethers.HDNodeWallet.fromPhrase(mnemonic);
    const mainAddress = wallet.address;

    return this.balanceService.getMasterWalletBalance(coin, mainAddress);
  }

  // Endpoint to get the platform balance (incoming and outgoing)
  @Get('platform-balance')
  async getPlatformBalance(): Promise<{ incoming: string; outgoing: string }> {
    return this.balanceService.getPlatformBalance();
  }
}

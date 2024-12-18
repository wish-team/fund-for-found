import { Module } from '@nestjs/common';
import { CoinService } from './coin.service';
import { BitcoinStrategy } from './strategy/bitcoin-coin.strategy';
import { EthereumStrategy } from './strategy/ethereum-coin.strategy';
import { ethers } from 'ethers';

@Module({
  providers: [
    CoinService,
    BitcoinStrategy,
    {
      provide: 'ETH_PROVIDER',
      useFactory: () => {
        const rpcUrl = process.env.BLOCKCHAIN_RPC_URL;
        if (!rpcUrl) {
          throw new Error(
            'Ethereum RPC URL not found in environment variables.',
          );
        }
        return new ethers.JsonRpcProvider(rpcUrl);
      },
    },
    {
      provide: EthereumStrategy,
      useFactory: (provider: ethers.JsonRpcProvider) => {
        return new EthereumStrategy(provider);
      },
      inject: ['ETH_PROVIDER'],
    },
    {
      provide: 'CoinServiceInit',
      useFactory: (
        coinService: CoinService,
        bitcoinStrategy: BitcoinStrategy,
        ethereumStrategy: EthereumStrategy,
      ) => {
        coinService.registerStrategy('btc', bitcoinStrategy);
        coinService.registerStrategy('eth', ethereumStrategy);
      },
      inject: [CoinService, BitcoinStrategy, EthereumStrategy],
    },
  ],
  exports: [CoinService],
})
export class CoinModule {}

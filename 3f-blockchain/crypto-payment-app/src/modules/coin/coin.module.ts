import { Module } from '@nestjs/common';
import { CoinService } from './coin.service';
import { BitcoinStrategy } from './strategy/bitcoin-coin.strategy';
import { EthereumStrategy } from './strategy/ethereum-coin.strategy';
import { ethers } from 'ethers';
import { MaticStrategy } from './strategy/matic-coin.strategy';

@Module({
  providers: [
    CoinService,
    BitcoinStrategy,
    MaticStrategy,
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
        maticStrategy: MaticStrategy,
      ) => {
        coinService.registerStrategy('bitcoin', bitcoinStrategy);
        coinService.registerStrategy('ethereum', ethereumStrategy);
        coinService.registerStrategy('matic', maticStrategy);
      },
      inject: [CoinService, BitcoinStrategy, EthereumStrategy, MaticStrategy],
    },
  ],
  exports: [CoinService],
})
export class CoinModule {}

import { Module } from '@nestjs/common';
import { CoinService } from './coin.service';
import { BitcoinStrategy } from './strategy/bitcoin-coin.strategy';
import { EthereumStrategy } from './strategy/ethereum-coin.strategy';

@Module({
  providers: [
    CoinService,
    BitcoinStrategy,
    EthereumStrategy,
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

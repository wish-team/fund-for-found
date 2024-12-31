import { Module, Global } from '@nestjs/common';
import { ethers } from 'ethers';

@Global() // Makes the module globally available without importing it in every module
@Module({
  providers: [
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
  ],
  exports: ['ETH_PROVIDER'], // Export the provider so it can be injected elsewhere
})
export class BlockchainModule {}

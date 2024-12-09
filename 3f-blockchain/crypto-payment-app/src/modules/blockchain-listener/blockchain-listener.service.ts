import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ethers } from 'ethers'; // Importing ethers
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class BlockchainListenerService implements OnModuleInit {
  private provider: ethers.JsonRpcProvider; // Adjusting the type to JsonRpcProvider
  private readonly logger = new Logger(BlockchainListenerService.name);

  constructor(private readonly supabaseService: SupabaseService) {
    // Initialize provider (use Infura, Alchemy, or your node URL)
    this.provider = new ethers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL);
  }

  async onModuleInit() {
    this.logger.log('Starting blockchain listener...');
    await this.startListening();
  }

  async startListening() {
    // Fetch all pending addresses from Supabase
    const pendingAddresses = await this.supabaseService.getPendingAddresses();

    pendingAddresses.forEach((wallet) => {
      this.provider.on(wallet.address, async (tx) => {
        this.logger.log(`Transaction detected for address: ${wallet.address}`);

        // Validate transaction details
        const transaction = await this.provider.getTransaction(tx.hash);
        if (
          transaction &&
          transaction.to?.toLowerCase() === wallet.address.toLowerCase()
        ) {
          const amount = ethers.formatEther(transaction.value);

          // Mark as received in the database
          await this.supabaseService.updateTransactionStatus(
            wallet.id,
            'received',
            amount,
          );

          // Deduct commission and transfer remainder
          await this.processReceivedFunds(
            wallet.address,
            amount,
            wallet.brandId,
          );
        }
      });
    });
  }

  async processReceivedFunds(address: string, amount: string, brandId: number) {
    const commissionPercentage = 10;
    const commission = (parseFloat(amount) * commissionPercentage) / 100;
    const userAmount = parseFloat(amount) - commission;

    // Record commission and send funds to brand
    const brandAddress = await this.supabaseService.getAddress(brandId);
    if (!brandAddress)
      throw new Error(`Brand wallet not found for ID ${brandId}`);

    // Await signer before using sendTransaction
    const signer = await this.provider.getSigner(); // Add 'await' here
    const tx = await signer.sendTransaction({
      to: brandAddress,
      value: ethers.parseEther(userAmount.toString()),
    });

    // Log transfer details in the database
    await this.supabaseService.logCommissionAndTransfer(
      address,
      brandAddress,
      commission,
      userAmount,
      tx.hash,
    );
  }
}

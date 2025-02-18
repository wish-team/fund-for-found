import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ethers } from 'ethers';
import { SupabaseService } from '../supabase/supabase.service';
import { PaymentService } from '../payment/payment.service';
import axios from 'axios';

@Injectable()
export class BlockchainListenerService implements OnModuleInit {
  private readonly logger = new Logger(BlockchainListenerService.name);
  private readonly etherscanApiKey = process.env.ETHERSCAN_API_KEY;
  private readonly etherscanBaseUrl = 'https://api-sepolia.etherscan.io/api';

  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly paymentService: PaymentService,
  ) {}

  async checkPendingAddressesForPayments() {
    this.logger.log('Starting payment check for pending addresses...');
    
    try {
      const { data: pendingTxs, error } = await this.supabaseService
        .getClient()
        .from('transactions')
        .select('id, generated_address, brand_id, status, created_at')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (!pendingTxs || pendingTxs.length === 0) {
        this.logger.log('No pending transactions found');
        return;
      }

      this.logger.log(`Found ${pendingTxs.length} pending transactions to check`);

      for (const pendingTx of pendingTxs) {
        const address = pendingTx.generated_address;
        this.logger.log(`\nChecking address ${address} for incoming transactions...`);

        try {
          const response = await axios.get(this.etherscanBaseUrl, {
            params: {
              module: 'account',
              action: 'txlist',
              address: address,
              startblock: 0,
              endblock: 99999999,
              sort: 'desc',
              apikey: this.etherscanApiKey
            }
          });

          if (response.data.status === '1' && response.data.result.length > 0) {
            const transactions = response.data.result;
            
            const incomingTxs = transactions.filter(tx => 
              tx.to.toLowerCase() === address.toLowerCase() && 
              tx.isError === '0' &&
              Number(tx.value) > 0
            );

            if (incomingTxs.length > 0) {
              this.logger.log(`Found ${incomingTxs.length} incoming transactions`);

              const latestTx = incomingTxs[0];
              const amount = ethers.formatEther(latestTx.value);
              
              // Debug log: Check if we have a pending transaction for this address
              const { data: dbTx, error: dbError } = await this.supabaseService
                .getClient()
                .from('transactions')
                .select('*')
                .filter('generated_address', 'ilike', address)
                .eq('status', 'pending')
                .single();

              if (dbError || !dbTx) {
                this.logger.error(`No pending transaction found in database for address ${address}`);
                this.logger.error('Database error:', dbError);
                continue;
              }

              this.logger.log('Found pending transaction in database:', {
                id: dbTx.id,
                address: dbTx.generated_address,
                status: dbTx.status
              });

              this.logger.log('='.repeat(50));
              this.logger.log('FOUND INCOMING TRANSACTION!');
              this.logger.log(`Transaction Details:`, {
                hash: latestTx.hash,
                from: latestTx.from,
                to: latestTx.to,
                amount,
                blockNumber: latestTx.blockNumber,
                timestamp: new Date(Number(latestTx.timeStamp) * 1000)
              });

              this.logger.log('Database Transaction:', {
                id: dbTx.id,
                address: dbTx.generated_address,
                status: dbTx.status
              });

              // Check if this transaction was already processed
              const { data: existingTx } = await this.supabaseService
                .getClient()
                .from('transactions')
                .select('*')
                .eq('received_transaction_hash', latestTx.hash)
                .single();

              if (existingTx) {
                this.logger.log(`Transaction ${latestTx.hash} already processed, skipping`);
                continue;
              }

              // Update transaction with hash before processing
              const { error: updateError } = await this.supabaseService
                .getClient()
                .from('transactions')
                .update({
                  received_transaction_hash: latestTx.hash,
                  received_amount: amount
                })
                .eq('id', dbTx.id);

              if (updateError) {
                this.logger.error('Failed to update transaction:', updateError);
                continue;
              }

              // Wait a moment for the database to update
              await this.sleep(2000);

              try {
                this.logger.log(`Processing payment for transaction ${latestTx.hash}...`);
                const result = await this.paymentService.processPayment(latestTx.hash);
                this.logger.log('Payment processed successfully:', result);
              } catch (error) {
                this.logger.error(`Failed to process payment for tx ${latestTx.hash}:`, error);
                
                // Update status to failed
                await this.supabaseService
                  .getClient()
                  .from('transactions')
                  .update({ 
                    status: 'failed',
                    error_message: error.message
                  })
                  .eq('id', dbTx.id);
              }
              this.logger.log('='.repeat(50));
            } else {
              this.logger.log(`No incoming transactions found for address ${address}`);
            }
          } else {
            this.logger.log(`No transactions found for address ${address}`);
          }

          await this.sleep(200);
        } catch (error) {
          this.logger.error(`Error checking address ${address}:`, error.message);
          await this.sleep(1000);
        }
      }
      
      this.logger.log('Finished checking all pending addresses for payments');
    } catch (error) {
      this.logger.error('Error in checkPendingAddressesForPayments:', error.message);
    }
  }

  private async sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async onModuleInit() {
    this.logger.log('Starting blockchain listener...');
    await this.checkPendingAddressesForPayments();
    
    // Check every minute
    setInterval(() => this.checkPendingAddressesForPayments(), 60 * 1000);
  }
}

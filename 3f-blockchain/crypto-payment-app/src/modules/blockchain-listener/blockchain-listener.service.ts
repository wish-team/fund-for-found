import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ethers } from 'ethers';
import { SupabaseService } from '../supabase/supabase.service';
import { PaymentService } from '../payment/payment.service';
import { AddressService } from '../address/address.service';
import WebSocket from 'ws';
import { EtherscanProvider } from 'ethers';

interface PendingTransaction {
  id: number;
  generated_address: string;
  brand_id: number;
  status: string;
}

@Injectable()
export class BlockchainListenerService implements OnModuleInit {
  private provider: ethers.WebSocketProvider;
  private readonly logger = new Logger(BlockchainListenerService.name);
  private pendingTransactions: PendingTransaction[] = [];
  private readonly requiredConfirmations = 1;
  private processingBlocks = false;

  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly paymentService: PaymentService,
    private readonly addressService: AddressService,
  ) {
    const wsUrl = process.env.BLOCKCHAIN_WS_URL;
    if (!wsUrl) {
      throw new Error('BLOCKCHAIN_WS_URL is not set in environment variables.');
    }
    this.provider = new ethers.WebSocketProvider(wsUrl);
  }

  async onModuleInit() {
    this.logger.log('Starting blockchain listener...');
    await this.refreshPendingTransactions();
    await this.checkPendingAddressesForPayments();
    
    // Refresh pending transactions every 30 seconds
    setInterval(() => this.refreshPendingTransactions(), 30 * 1000);
    this.startListening();
  }

  async refreshPendingTransactions() {
    try {
      const { data: pending, error } = await this.supabaseService
        .getClient()
        .from('transactions')
        .select('id, generated_address, brand_id, status')
        .eq('status', 'pending');

      if (error) throw error;

      this.pendingTransactions = pending || [];
      this.logger.log(`Monitoring ${this.pendingTransactions.length} pending transactions`);
      this.logger.log('Pending addresses:', this.pendingTransactions.map(t => t.generated_address));
    } catch (error) {
      this.logger.error('Error refreshing pending transactions:', error);
    }
  }

  async checkPendingAddressesForPayments() {
    this.logger.log('Starting payment check for pending addresses (newest first)...');
    
    try {
      // Get pending transactions ordered by newest first
      const { data: pendingTxs, error } = await this.supabaseService
        .getClient()
        .from('transactions')
        .select('id, generated_address, brand_id, status, created_at')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (error) {
        this.logger.error('Error fetching pending transactions:', error);
        return;
      }

      if (!pendingTxs || pendingTxs.length === 0) {
        this.logger.log('No pending transactions found');
        return;
      }

      this.logger.log(`Found ${pendingTxs.length} pending transactions to check`);
      
      // Process each address one by one, starting with the newest
      for (const pendingTx of pendingTxs) {
        const address = pendingTx.generated_address.toLowerCase();
        this.logger.log(`\nChecking address ${address} for incoming transactions...`);

        try {
          const latestBlock = await this.provider.getBlockNumber();
          const CHUNK_SIZE = 2000; // Check 2000 blocks at a time
          let fromBlock = Math.max(0, latestBlock - 10000); // Last 10000 blocks
          
          while (fromBlock <= latestBlock) {
            const toBlock = Math.min(fromBlock + CHUNK_SIZE, latestBlock);
            
            this.logger.log(`Checking blocks ${fromBlock} to ${toBlock} for address ${address}`);
            
            try {
              // Get block with transactions
              const block = await this.provider.getBlock(toBlock, true);
              if (!block || !block.transactions) continue;

              // Check each transaction in the block
              for (const txHash of block.transactions) {
                try {
                  const tx = await this.provider.getTransaction(txHash);
                  if (!tx || !tx.to) continue;

                  // Check if this transaction is to our address
                  if (tx.to.toLowerCase() === address) {
                    this.logger.log('='.repeat(50));
                    this.logger.log('FOUND INCOMING TRANSACTION!');
                    this.logger.log(`Transaction Details:`, {
                      hash: tx.hash,
                      to: tx.to,
                      amount: ethers.formatEther(tx.value),
                      blockNumber: tx.blockNumber
                    });

                    // Check if transaction was already processed
                    const { data: existingTx } = await this.supabaseService
                      .getClient()
                      .from('transactions')
                      .select('transaction_hash')
                      .eq('transaction_hash', tx.hash)
                      .eq('status', 'completed')
                      .single();

                    if (existingTx) {
                      this.logger.log(`Transaction ${tx.hash} already processed, skipping`);
                      continue;
                    }

                    const confirmations = await tx.confirmations();
                    this.logger.log(`Confirmations: ${confirmations}`);

                    if (confirmations >= this.requiredConfirmations) {
                      try {
                        this.logger.log(`Processing payment for transaction ${tx.hash}...`);
                        const result = await this.paymentService.processPayment(tx.hash);
                        this.logger.log('Payment processed successfully:', result);

                        // Update the database status
                        await this.supabaseService
                          .getClient()
                          .from('transactions')
                          .update({ 
                            status: 'completed', 
                            transaction_hash: tx.hash,
                            amount: ethers.formatEther(tx.value)
                          })
                          .eq('id', pendingTx.id);

                        this.logger.log(`Transaction ${tx.hash} processed and database updated`);
                        return; // Exit after finding and processing a payment
                      } catch (error) {
                        this.logger.error(`Failed to process payment for tx ${tx.hash}:`, error);
                      }
                    } else {
                      this.logger.log(`Waiting for more confirmations. Current: ${confirmations}, Required: ${this.requiredConfirmations}`);
                    }
                    this.logger.log('='.repeat(50));
                  }
                } catch (error) {
                  this.logger.warn(`Error checking transaction ${txHash}:`, error.message);
                  continue;
                }
              }

              // Move to next chunk
              fromBlock += CHUNK_SIZE + 1;
              
              // Add small delay between chunks
              await this.sleep(1000);
            } catch (error) {
              this.logger.error(`Error checking block range ${fromBlock}-${toBlock}:`, error.message);
              fromBlock += CHUNK_SIZE + 1; // Move to next chunk even if there's an error
              await this.sleep(2000);
            }
          }
        } catch (error) {
          this.logger.error(`Error checking address ${address}:`, error.message);
          await this.sleep(5000);
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

  startListening() {
    this.logger.log('Starting to listen for new blocks...');
    
    this.provider.on('block', async (blockNumber: number) => {
      if (this.processingBlocks) return;
      
      this.processingBlocks = true;
      try {
        this.logger.log(`New block received: ${blockNumber}`);
        const block = await this.provider.getBlock(blockNumber, true);
        
        if (!block || !block.transactions) return;
        
        for (const txHash of block.transactions) {
          const tx = await this.provider.getTransaction(txHash);
          
          if (!tx?.to) continue;
          
          const toAddress = tx.to.toLowerCase();
          const pendingTx = this.pendingTransactions.find(
            pt => pt.generated_address.toLowerCase() === toAddress
          );

          if (pendingTx) {
            this.logger.log(`Found new payment to pending address ${toAddress}`);
            this.logger.log(`Transaction Hash: ${tx.hash}`);
            this.logger.log(`Amount: ${ethers.formatEther(tx.value)} ETH`);
            
            try {
              const result = await this.paymentService.processPayment(tx.hash);
              this.logger.log('Payment processed successfully:', result);
              
              // Remove from pending transactions
              this.pendingTransactions = this.pendingTransactions.filter(
                t => t.generated_address.toLowerCase() !== toAddress
              );
            } catch (error) {
              this.logger.error(`Failed to process payment for tx ${tx.hash}:`, error);
            }
          }
        }
      } finally {
        this.processingBlocks = false;
      }
    });

    if (this.provider.websocket instanceof WebSocket) {
      this.provider.websocket.addEventListener('close', () => {
        this.logger.warn('WebSocket closed');
        this.reconnect();
      });
    }
  }

  private async reconnect() {
    this.logger.log('Attempting to reconnect...');
    try {
      const wsUrl = process.env.BLOCKCHAIN_WS_URL;
      if (!this.provider.destroyed) {
        await this.provider.destroy();
      }
      this.provider = new ethers.WebSocketProvider(wsUrl);
      this.startListening();
      this.logger.log('Successfully reconnected');
    } catch (error) {
      this.logger.error('Reconnection failed:', error);
      setTimeout(() => this.reconnect(), 5000);
    }
  }
}

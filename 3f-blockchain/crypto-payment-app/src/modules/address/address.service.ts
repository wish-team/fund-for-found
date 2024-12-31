import { Injectable, Inject } from '@nestjs/common';
import { CoinService } from '../coin/coin.service'; // Inject CoinService
import { ethers, HDNodeWallet } from 'ethers';

@Injectable()
export class AddressService {
  constructor(
    @Inject('ETH_PROVIDER') private readonly provider: ethers.JsonRpcProvider,
    private coinService: CoinService, // Inject CoinService
  ) {
    const rpcUrl = process.env.BLOCKCHAIN_RPC_URL; // Infura/Alchemy RPC URL

    if (!rpcUrl) {
      throw new Error('Ethereum RPC URL not found in environment variables.');
    }

    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    console.log('Ethereum Provider Initialized');
  }

  async getMasterWalletBalance(address: string, coin: string): Promise<string> {
    try {
      const coinStrategy = this.coinService.getStrategy(coin); // Get the coin strategy
      const balance = await coinStrategy.getBalance(address);
      console.log(`Balance for ${coin} address ${address}: ${balance}`);
      return balance;
    } catch (error) {
      console.error('Error fetching master wallet balance:', error.message);
      throw new Error('Failed to fetch master wallet balance.');
    }
  }

  async generateDerivedAddress(coin: string, index: number): Promise<string> {
    try {
      const coinStrategy = this.coinService.getStrategy(coin); // Get the coin strategy
      const derivedAddress = coinStrategy.generateAddress(
        process.env.MASTER_MNEMONIC,
        index,
      );
      console.log(
        `Generated Address for ${coin} at index ${index}: ${derivedAddress}`,
      );
      return derivedAddress;
    } catch (error) {
      console.error('Error generating derived address:', error.message);
      throw new Error(`Failed to generate address for ${coin}.`);
    }
  }
  async monitorAndTransferFunds(
    receivedTransactionHash: string,
    mainWallet: HDNodeWallet,
  ): Promise<string> {
    // Fetch transaction details from blockchain
    const tx = await this.provider.getTransaction(receivedTransactionHash);
    if (!tx || !tx.to) {
      throw new Error('Transaction not found or invalid');
    }

    // Get the transaction receipt
    const txReceipt = await this.provider.getTransactionReceipt(
      receivedTransactionHash,
    );
    if (!txReceipt) {
      throw new Error('Transaction receipt not found');
    }

    // Get the current block number and calculate confirmations
    const currentBlockNumber = await this.provider.getBlockNumber();
    const confirmations = currentBlockNumber - txReceipt.blockNumber + 1; // Adding 1 for the initial confirmation
    if (confirmations < 1) {
      throw new Error('Transaction not confirmed yet');
    }

    const receivedAmount = parseFloat(ethers.formatEther(tx.value));
    if (receivedAmount <= 0) {
      throw new Error('Transaction amount is zero or invalid');
    }

    // Transfer funds to main wallet
    try {
      const mainWalletTransaction = await mainWallet.sendTransaction({
        to: mainWallet.address, // Send funds to the main wallet
        value: ethers.parseEther(receivedAmount.toString()),
      });
      console.log('Transferred to main wallet:', mainWalletTransaction.hash);
      return mainWalletTransaction.hash;
    } catch (error) {
      throw new Error('Failed to transfer funds: ' + error.message);
    }
  }
}

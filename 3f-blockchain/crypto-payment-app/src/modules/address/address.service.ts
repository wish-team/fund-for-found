import { Injectable, Inject } from '@nestjs/common';
import { CoinService } from '../coin/coin.service';
import { ethers, HDNodeWallet, Wallet } from 'ethers';

interface DerivedCredentials {
  derivedAddress: string;
  derivedPrivateKey: string;
}

@Injectable()
export class AddressService {
  constructor(
    @Inject('ETH_PROVIDER') private readonly provider: ethers.JsonRpcProvider,
    private coinService: CoinService,
  ) {
    const rpcUrl = process.env.BLOCKCHAIN_RPC_URL;

    if (!rpcUrl) {
      throw new Error('Ethereum RPC URL not found in environment variables.');
    }

    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    console.log('Ethereum Provider Initialized');
  }

  private getProviderForCoinAndNetwork(
    coin: string,
    network: string,
  ): ethers.JsonRpcProvider {
    const coinStrategy = this.coinService.getStrategy(coin);
    const supportedNetworks = coinStrategy.getNetwork();

    if (!supportedNetworks.includes(network)) {
      throw new Error(`Network ${network} is not supported for ${coin}.`);
    }

    const rpcUrl = process.env[`RPC_URL_${network.toUpperCase()}`];
    if (!rpcUrl) {
      throw new Error(`${network} RPC URL not found in environment variables.`);
    }

    return new ethers.JsonRpcProvider(rpcUrl);
  }

  async getMasterWalletBalance(address: string, coin: string): Promise<string> {
    try {
      const coinStrategy = this.coinService.getStrategy(coin);
      const balance = await coinStrategy.getBalance(address);
      console.log(`Balance for ${coin} address ${address}: ${balance}`);
      return balance;
    } catch (error) {
      console.error('Error fetching master wallet balance:', error.message);
      throw new Error('Failed to fetch master wallet balance.');
    }
  }

  async generateDerivedAddress(
    coin: string,
    index: number,
  ): Promise<DerivedCredentials> {
    try {
      const coinStrategy = this.coinService.getStrategy(coin);
      const { derivedAddress, derivedPrivateKey } =
        coinStrategy.generateAddress(process.env.MASTER_MNEMONIC, index);
      console.log(
        `Generated Address for ${coin} at index ${index}: ${derivedAddress}`,
      );
      return { derivedAddress, derivedPrivateKey };
    } catch (error) {
      console.error('Error generating derived address:', error.message);
      throw new Error(`Failed to generate address for ${coin}.`);
    }
  }

  async monitorAndTransferFunds(
    receivedTransactionHash: string,
    derivedPrivateKey: string,
    commissionWallet: ethers.Wallet,
  ): Promise<string> {
    try {
      // Get transaction details
      const tx = await this.provider.getTransaction(receivedTransactionHash);
      if (!tx || !tx.to) {
        throw new Error('Transaction not found or invalid');
      }

      // Create derived wallet instance
      const derivedWallet = new ethers.Wallet(derivedPrivateKey, this.provider);
      console.log('Derived wallet:', derivedWallet.address);

      // Get current balance
      const balance = await this.provider.getBalance(derivedWallet.address);
      console.log('Current balance:', ethers.formatEther(balance), 'ETH');

      // Use much lower gas settings
      const gasLimit = 21000n; // Standard ETH transfer
      const gasPrice = ethers.parseUnits('1.5', 'gwei'); // Much lower gas price
      const gasCost = gasLimit * gasPrice;

      console.log('Estimated gas cost:', ethers.formatEther(gasCost), 'ETH');

      if (balance <= gasCost) {
        throw new Error(
          `Insufficient funds. Balance: ${ethers.formatEther(balance)} ETH, ` +
          `Gas needed: ${ethers.formatEther(gasCost)} ETH`
        );
      }

      // Calculate amount to send (total balance minus gas cost)
      const valueToSend = balance - gasCost;
      console.log('Amount to send:', ethers.formatEther(valueToSend), 'ETH');

      // Send transaction with minimal gas settings
      const mainWalletTransaction = await derivedWallet.sendTransaction({
        to: commissionWallet.address,
        value: valueToSend,
        gasLimit,
        maxFeePerGas: gasPrice,
        maxPriorityFeePerGas: ethers.parseUnits('1', 'gwei'), // Minimal priority fee
        type: 2, // EIP-1559 transaction
      });

      console.log('Transfer initiated:', mainWalletTransaction.hash);

      // Wait for confirmation
      await mainWalletTransaction.wait(1);

      return mainWalletTransaction.hash;
    } catch (error: any) {
      console.error('Transfer error:', error);
      throw new Error('Failed to transfer funds: ' + error.message);
    }
  }
}
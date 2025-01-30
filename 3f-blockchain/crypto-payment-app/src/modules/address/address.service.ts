import { Injectable, Inject } from '@nestjs/common';
import { CoinService } from '../coin/coin.service'; // Inject CoinService
import { ethers, HDNodeWallet, Wallet } from 'ethers';

interface DerivedCredentials {
  derivedAddress: string;
  derivedPrivateKey: string;
}

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

  private getProviderForCoinAndNetwork(
    coin: string,
    network: string,
  ): ethers.JsonRpcProvider {
    const coinStrategy = this.coinService.getStrategy(coin); // Get the strategy for the coin
    const supportedNetworks = coinStrategy.getNetwork();

    if (!supportedNetworks.includes(network)) {
      throw new Error(`Network ${network} is not supported for ${coin}.`);
    }

    // Dynamically fetch the network-specific URL (e.g., `RPC_URL_POLYGON`)
    const rpcUrl = process.env[`RPC_URL_${network.toUpperCase()}`];
    if (!rpcUrl) {
      throw new Error(`${network} RPC URL not found in environment variables.`);
    }

    return new ethers.JsonRpcProvider(rpcUrl);
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

  async generateDerivedAddress(
    coin: string,
    index: number,
  ): Promise<DerivedCredentials> {
    try {
      const coinStrategy = this.coinService.getStrategy(coin); // Get the coin strategy
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

    let derivedWallet: ethers.Wallet;
    let commissionWallet2: ethers.Wallet;
    // Transfer funds to main wallet
    try {
      derivedWallet = new ethers.Wallet(derivedPrivateKey, this.provider);
      commissionWallet2 = new ethers.Wallet(
        commissionWallet.privateKey,
        this.provider,
      );
      console.log('derived wallet:', derivedWallet.address);

      const balance = await this.provider.getBalance(derivedWallet.address);
      const balance2 = await this.provider.getBalance(
        commissionWallet2.address,
      );
      console.log('balance: ', balance);
      console.log('balance 2: ', balance2);
      const feeData = await this.provider.getFeeData();
      const gasPrice = feeData.gasPrice;

      if (!gasPrice) {
        throw new Error('Gas price not available');
      }
      const gasLimit = 21000n; // Standard for ETH transfers
      const gasCost = gasLimit * gasPrice;
      if (balance < gasCost) {
        throw new Error(
          `Insufficient funds. Balance: ${ethers.formatEther(balance)} ETH, Gas needed: ${ethers.formatEther(gasCost)} ETH`,
        );
      }
      const valueToSend = balance - gasCost;

      const mainWalletTransaction = await derivedWallet.sendTransaction({
        to: commissionWallet.address,
        value: valueToSend,
        gasLimit: 21000n, // 👈 Match calculated gas limit
        gasPrice: gasPrice, // 👈 Match calculated gas price
      });
      console.log('Transferred to main wallet:', mainWalletTransaction.hash);
      return mainWalletTransaction.hash;
    } catch (error) {
      throw new Error('Failed to transfer funds: ' + error.message);
    }
  }
}

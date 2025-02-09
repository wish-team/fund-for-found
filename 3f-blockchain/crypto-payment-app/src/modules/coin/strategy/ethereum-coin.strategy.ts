import { CoinStrategy } from './coin-strategy.interface';
import { ethers } from 'ethers';
import { HDNode } from '@ethersproject/hdnode';
import { BadRequestException } from '@nestjs/common';
import axios from 'axios';

interface DerivedCredentials {
  derivedAddress: string;
  derivedPrivateKey: string;
}

export class EthereumStrategy implements CoinStrategy {
  private provider: ethers.JsonRpcProvider;
  private supportedNetworks: string[] = ['bsc', 'sepolia'];

  constructor(provider: ethers.JsonRpcProvider) {
    this.provider = provider;
  }

  generateAddress(mnemonic: string, index: number): DerivedCredentials {
    const hdNode = HDNode.fromMnemonic(mnemonic);
    const path = `m/44'/60'/0'/0/${index}`;
    const wallet = hdNode.derivePath(path);
    return {
      derivedAddress: wallet.address,
      derivedPrivateKey: wallet.privateKey,
    };
  }

  async getBalance(address: string): Promise<string> {
    const decimals = 6;
    const balance = await this.provider.getBalance(address);
    const formattedBalance = ethers.formatUnits(balance, decimals);
    return parseFloat(formattedBalance).toFixed(decimals);
  }

  async sendTransaction(
    from: string,
    to: string,
    amount: string,
    privateKey: string,
  ): Promise<string> {
    const wallet = new ethers.Wallet(privateKey, this.provider);
    const tx = await wallet.sendTransaction({
      to,
      value: ethers.parseEther(amount),
    });
    return tx.hash;
  }

  getNetwork(): string[] {
    return this.supportedNetworks;
  }

  async getGasFee(network: string): Promise<number> {
    const networkMap: Record<string, string> = {
      mainnet: 'https://api.etherscan.io',
      ropsten: 'https://api-ropsten.etherscan.io',
      rinkeby: 'https://api-rinkeby.etherscan.io',
      kovan: 'https://api-kovan.etherscan.io',
      goerli: 'https://api-goerli.etherscan.io',
      sepolia: 'https://sepolia.etherscan.io',
    };

    const baseUrl = networkMap[network.toLowerCase()];
    if (!baseUrl) {
      throw new BadRequestException(
        `Unsupported network '${network}' for Ethereum.`,
      );
    }

    const apiKey = process.env.ETHERSCAN_API_KEY;
    if (!apiKey) {
      throw new BadRequestException('ETHERSCAN_API_KEY is not set.');
    }

    const apiUrl = `${baseUrl}/api?module=gastracker&action=gasoracle&apikey=${apiKey}`;

    try {
      const response = await axios.get(apiUrl);
      if (response.data.status !== '1') {
        throw new Error(response.data.result || 'Failed to fetch gas fees.');
      }

      // Example: Return the proposed gas price in Gwei
      return parseFloat(response.data.result.ProposeGasPrice);
    } catch (error) {
      throw new BadRequestException(
        `Error fetching gas fees: ${error.message}`,
      );
    }
  }
}

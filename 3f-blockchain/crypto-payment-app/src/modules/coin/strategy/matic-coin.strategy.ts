// src/coin/strategy/polygon-coin.strategy.ts
import { CoinStrategy } from './coin-strategy.interface';
import { ethers } from 'ethers';
import { HDNode } from '@ethersproject/hdnode';
import { BadRequestException } from '@nestjs/common';
import axios from 'axios';

interface DerivedCredentials {
  derivedAddress: string;
  derivedPrivateKey: string;
}

export class MaticStrategy implements CoinStrategy {
  private provider: ethers.JsonRpcProvider;
  // If you want multiple networks (mainnet vs mumbai), add them here:
  private supportedNetworks: string[] = ['polygon', 'mumbai', 'sepolia'];

  constructor(provider: ethers.JsonRpcProvider) {
    this.provider = provider;
  }

  // For example, using the same derivation path as Ethereum
  generateAddress(mnemonic: string, index: number): DerivedCredentials {
    const hdNode = HDNode.fromMnemonic(mnemonic);
    // 44'/60' is the standard for EVM-compatible (like Ethereum, Polygon)
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
    // For Polygonscan, check the official docs. The endpoints are typically:
    //   https://api.polygonscan.com for mainnet
    //   https://api-testnet.polygonscan.com for testnet (Mumbai)
    // We'll just do a similar approach to your EthereumStrategy:
    const networkMap: Record<string, string> = {
      polygon: 'https://api.polygonscan.com',
      mumbai: 'https://api-testnet.polygonscan.com',
    };

    const baseUrl = networkMap[network.toLowerCase()];
    if (!baseUrl) {
      throw new BadRequestException(
        `Unsupported network '${network}' for Polygon.`,
      );
    }

    const apiKey = process.env.POLYGONSCAN_API_KEY;
    if (!apiKey) {
      throw new BadRequestException('POLYGONSCAN_API_KEY is not set.');
    }

    const apiUrl = `${baseUrl}/api?module=gastracker&action=gasoracle&apikey=${apiKey}`;

    try {
      const response = await axios.get(apiUrl);
      if (response.data.status !== '1') {
        throw new Error(response.data.result || 'Failed to fetch gas fees.');
      }
      // Return the "ProposeGasPrice" in Gwei
      return parseFloat(response.data.result.ProposeGasPrice);
    } catch (error) {
      throw new BadRequestException(
        `Error fetching gas fees: ${error.message}`,
      );
    }
  }
}

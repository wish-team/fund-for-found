import { CoinStrategy } from './coin-strategy.interface';
import { ethers } from 'ethers';
import { HDNode } from '@ethersproject/hdnode';

export class EthereumStrategy implements CoinStrategy {
  private provider: ethers.JsonRpcProvider;

  constructor(provider: ethers.JsonRpcProvider) {
    this.provider = provider;
  }

  generateAddress(mnemonic: string, index: number): string {
    const hdNode = HDNode.fromMnemonic(mnemonic);
    const path = `m/44'/60'/0'/0/${index}`;
    const wallet = hdNode.derivePath(path);
    return wallet.address;
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
}

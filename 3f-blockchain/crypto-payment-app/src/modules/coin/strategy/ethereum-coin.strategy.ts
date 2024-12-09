import { CoinStrategy } from './coin-strategy.interface';
import { ethers } from 'ethers';

export class EthereumStrategy implements CoinStrategy {
  private provider: ethers.JsonRpcProvider;

  constructor(rpcUrl: string) {
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
  }

  generateAddress(mnemonic: string, index: number): string {
    const path = `m/44'/60'/0'/0/${index}`;
    const wallet = ethers.HDNodeWallet.fromPhrase(mnemonic).derivePath(path);
    return wallet.address;
  }

  async getBalance(address: string): Promise<string> {
    const balance = await this.provider.getBalance(address);
    return ethers.formatEther(balance);
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

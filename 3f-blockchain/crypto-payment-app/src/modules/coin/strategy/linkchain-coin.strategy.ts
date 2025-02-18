import { CoinStrategy } from './coin-strategy.interface';
import Web3 from 'web3';
import { ethers } from 'ethers';

export class LinkChainStrategy implements CoinStrategy {
  private web3: Web3;
  private supportedNetworks: string[] = ['bsc', 'erc20', 'sepolia'];
  provider: ethers.JsonRpcProvider;

  constructor(rpcUrl: string) {
    this.web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));
  }

  generateAddress(): { derivedAddress: string; derivedPrivateKey: string } {
    const account = this.web3.eth.accounts.create();
    return {
      derivedAddress: account.address,
      derivedPrivateKey: account.privateKey,
    };
  }

  async getBalance(address: string): Promise<string> {
    const balance = await this.web3.eth.getBalance(address);
    return this.web3.utils.fromWei(balance, 'ether');
  }
  async sendTransaction(
    from: string,
    to: string,
    amount: string,
    privateKey: string,
  ): Promise<string> {
    // Convert amount to wei
    const valueWei = ethers.parseEther(amount); // in v6, returns a bigint

    // Create a Wallet from private key
    const wallet = new ethers.Wallet(privateKey, this.provider);

    // Send transaction
    const txResponse = await wallet.sendTransaction({
      to,
      value: valueWei,
      gasLimit: 21000n,
    });

    // Return the string hash (e.g. "0x1234abcd...")
    return txResponse.hash;
  }
  getNetwork(): string[] {
    return this.supportedNetworks;
  }

  async getGasFee(): Promise<number> {
    const gasPrice = await this.web3.eth.getGasPrice();
    return parseFloat(this.web3.utils.fromWei(gasPrice, 'gwei'));
  }
}

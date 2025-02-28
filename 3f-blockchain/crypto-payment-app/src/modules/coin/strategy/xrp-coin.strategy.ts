import { CoinStrategy } from './coin-strategy.interface';
import { RippleAPI } from 'ripple-lib';
import { BadRequestException } from '@nestjs/common';

export class XRPStrategy implements CoinStrategy {
  private api: RippleAPI;
  private supportedNetworks: string[] = ['mainnet', 'testnet', 'devnet'];

  constructor(rpcUrl: string) {
    this.api = new RippleAPI({ server: rpcUrl });
  }

  generateAddress(mnemonic: string, index: number) {
    // The XRPL doesn't use mnemonics/HD derivation in the same way as Ethereum,
    // so this is just an example:
    //
    // If you want to truly derive from a mnemonic, you'd handle BIP39 => seed => key pair
    // For a simplistic approach, let's just generate a random address:
    const { address, secret } = this.api.generateAddress();

    // Return it in the DerivedCredentials shape:
    return {
      derivedAddress: address,
      derivedPrivateKey: secret,
    };
  }

  async getBalance(address: string): Promise<string> {
    await this.api.connect();
    const balances = await this.api.getBalances(address);
    await this.api.disconnect();

    const xrpBalance = balances.find((b) => b.currency === 'XRP')?.value ?? '0';
    return xrpBalance;
  }

  async sendTransaction(
    from: string,
    to: string,
    amount: string,
    privateKey: string,
  ): Promise<string> {
    // ...
    return 'fake-tx-hash';
  }

  getNetwork(): string[] {
    return this.supportedNetworks;
  }

  async getGasFee(network: string): Promise<number> {
    // ...
    return 0.000012;
  }
}

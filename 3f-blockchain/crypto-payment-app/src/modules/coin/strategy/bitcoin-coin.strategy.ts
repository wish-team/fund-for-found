import { Injectable } from '@nestjs/common';
import { CoinStrategy } from './coin-strategy.interface';
import * as bip32 from 'bip32';
import * as bitcoin from 'bitcoinjs-lib';
import * as bip39 from 'bip39';

// Inside your `generateAddress` method:
import axios from 'axios';
import * as ECPairFactory from 'ecpair';
import * as ecc from 'tiny-secp256k1';

@Injectable()
export class BitcoinStrategy implements CoinStrategy {
  private readonly network: bitcoin.Network;
  private readonly ECPair: ReturnType<typeof ECPairFactory.ECPairFactory>;

  constructor() {
    const networkType = process.env.BTC_NETWORK || 'testnet';
    this.network =
      networkType === 'mainnet'
        ? bitcoin.networks.bitcoin
        : bitcoin.networks.testnet;

    // Initialize ECPair factory with secp256k1
    this.ECPair = ECPairFactory.ECPairFactory(ecc);
  }

  generateAddress(mnemonic: string, index: number): string {
    if (!mnemonic) {
      throw new Error('Mnemonic not provided.');
    }

    const seed = bip39.mnemonicToSeedSync(mnemonic);

    // Ensure bip32 is properly used
    // const bip32API = bip32 as unknown as BIP32API;
    const BIP32 = bip32.BIP32Factory(ecc); // Initialize with secp256k1

    const root = BIP32.fromSeed(seed, this.network);
    const child = root.derivePath(`m/44'/1'/0'/0/${index}`);

    // Convert publicKey to Buffer
    const { address } = bitcoin.payments.p2wpkh({
      pubkey: Buffer.from(child.publicKey),
      network: this.network,
    });
    if (!address) {
      throw new Error('Failed to generate Bitcoin address.');
    }

    console.log(`Derived Bitcoin address: ${address}`);
    return address;
  }

  async getBalance(address: string): Promise<string> {
    if (!address) {
      throw new Error('Address is required.');
    }

    const apiBase =
      this.network === bitcoin.networks.bitcoin
        ? 'https://api.blockcypher.com/v1/btc/main/addrs'
        : 'https://api.blockcypher.com/v1/btc/test3/addrs';

    try {
      const response = await axios.get(`${apiBase}/${address}/balance`);
      const balanceSatoshis = response.data.final_balance;
      const balanceBTC = (balanceSatoshis / 1e8).toFixed(8);
      console.log(`Balance for ${address}: ${balanceBTC} BTC`);
      return balanceBTC;
    } catch (error) {
      console.error('Error fetching balance:', error.message);
      throw new Error('Failed to fetch Bitcoin balance.');
    }
  }

  async sendTransaction(
    privateKey: string,
    toAddress: string,
    amount: string,
  ): Promise<string> {
    if (!privateKey || !toAddress || !amount) {
      throw new Error('Invalid transaction parameters.');
    }

    const satoshiAmount = Math.floor(parseFloat(amount) * 1e8);

    try {
      const keyPair = this.ECPair.fromWIF(privateKey, this.network);

      const { address: fromAddress } = bitcoin.payments.p2wpkh({
        pubkey: Buffer.from(keyPair.publicKey), // Explicitly convert publicKey to Buffer
        network: this.network,
      });

      if (!fromAddress) {
        throw new Error('Invalid sender address.');
      }

      const utxoApiBase =
        this.network === bitcoin.networks.bitcoin
          ? 'https://api.blockcypher.com/v1/btc/main/addrs'
          : 'https://api.blockcypher.com/v1/btc/test3/addrs';

      const utxoResponse = await axios.get(
        `${utxoApiBase}/${fromAddress}?unspentOnly=true`,
      );
      const utxos = utxoResponse.data.txrefs;

      if (!utxos || utxos.length === 0) {
        throw new Error('No UTXOs available for this address.');
      }

      const psbt = new bitcoin.Psbt({ network: this.network });
      let totalInput = 0;

      for (const utxo of utxos) {
        psbt.addInput({
          hash: utxo.tx_hash,
          index: utxo.tx_output_n,
          witnessUtxo: {
            script: bitcoin.address.toOutputScript(fromAddress, this.network),
            value: utxo.value,
          },
        });
        totalInput += utxo.value;
        if (totalInput >= satoshiAmount) break;
      }

      if (totalInput < satoshiAmount) {
        throw new Error('Insufficient balance.');
      }

      const fee = 1000;
      psbt.addOutput({ address: toAddress, value: satoshiAmount });
      const change = totalInput - satoshiAmount - fee;

      if (change > 0) {
        psbt.addOutput({ address: fromAddress, value: change });
      }

      // Sign inputs using a custom signer compatible with bitcoinjs-lib
      psbt.signAllInputs({
        publicKey: Buffer.from(keyPair.publicKey), // Convert publicKey to Buffer
        sign: (hash: Buffer) => Buffer.from(keyPair.sign(hash)), // Convert Uint8Array to Buffer
      });

      psbt.finalizeAllInputs();

      const txHex = psbt.extractTransaction().toHex();
      const broadcastApi =
        this.network === bitcoin.networks.bitcoin
          ? 'https://api.blockcypher.com/v1/btc/main/txs/push'
          : 'https://api.blockcypher.com/v1/btc/test3/txs/push';

      const broadcastResponse = await axios.post(broadcastApi, { tx: txHex });
      console.log('Transaction broadcasted:', broadcastResponse.data.tx.hash);

      return broadcastResponse.data.tx.hash;
    } catch (error) {
      console.error('Error sending transaction:', error.message);
      throw new Error('Failed to send transaction.');
    }
  }
}

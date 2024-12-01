import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PaymentRequestDto } from './dto/payment-request.dto';
import { BlockchainUtils } from 'src/utils';
import axios from 'axios';
import { supportedCoins } from 'src/config/supported_coin';

@Injectable()
export class PaymentService {
  private coins = supportedCoins;
  private commissionPercentage = 10; // 10% commission

  async processPayment(request: PaymentRequestDto) {
    const { coin, network, toAddress, amount, apiKey } = request;

    // Validate the coin and network
    const coinDetails = this.coins.find(
      (c) => c.coin === coin && c.networks.includes(network),
    );
    if (!coinDetails) {
      throw new HttpException(
        'Unsupported coin or network',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Calculate platform commission (10%)
    const commissionAmount = (amount * this.commissionPercentage) / 100;
    const userAmount = amount - commissionAmount;

    // Log the commission and user amount
    console.log(`Commission (10%): ${commissionAmount}`);
    console.log(`Amount to User: ${userAmount}`);

    try {
      // Fetch the current gas price dynamically
      const gasPrice = await BlockchainUtils.getGasPrice(coinDetails.api);

      console.log(`Fetched Gas Price: ${gasPrice}`);

      // Send money to the user
      const userTransaction = await this.makeTransaction(
        coinDetails,
        toAddress,
        userAmount,
        gasPrice,
        apiKey,
      );

      // Send platform commission to the platform's wallet
      const platformWallet = 'YOUR_PLATFORM_WALLET_ADDRESS';
      const platformTransaction = await this.makeTransaction(
        coinDetails,
        platformWallet,
        commissionAmount,
        gasPrice,
        apiKey,
      );

      return {
        success: true,
        userTransaction,
        platformTransaction,
        message: 'Payment processed successfully!',
      };
    } catch (error) {
      throw new HttpException(
        `Payment processing failed: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async makeTransaction(
    coinDetails,
    toAddress: string,
    amount: number,
    gasPrice: string,
    apiKey?: string,
  ) {
    const apiUrl = coinDetails.api;
    const payload = this.buildTransferPayload(
      coinDetails,
      toAddress,
      amount,
      gasPrice,
      apiKey,
    );

    // Make the API request
    const response = await axios.post(apiUrl, payload, {
      headers: { 'Content-Type': 'application/json' },
    });

    return response.data;
  }

  private buildTransferPayload(
    coinDetails,
    toAddress: string,
    amount: number,
    gasPrice: string,
    apiKey?: string,
  ) {
    switch (coinDetails.coin) {
      case 'eth':
        return {
          jsonrpc: '2.0',
          method: 'eth_sendTransaction',
          params: [
            {
              from: 'YOUR_WALLET_ADDRESS', // Replace with your wallet address
              to: toAddress,
              value: `0x${(amount * 1e18).toString(16)}`, // Convert to Wei
              gasPrice: `0x${parseInt(gasPrice).toString(16)}`, // Convert gas price to hexadecimal
              gas: '0x2710', // Example gas limit
            },
          ],
          id: 1,
        };

      // Add more cases for other coins as needed
      default:
        throw new Error('Unsupported coin');
    }
  }
}

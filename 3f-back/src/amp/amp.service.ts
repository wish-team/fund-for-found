import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AmpService {
  private readonly AMP_BASE_URL = 'https://amp.pooryaa.com';
  private readonly API_KEY = process.env.AMP_API_KEY;
  private readonly DESTINATION_WALLET = process.env.DESTINATION_WALLET;
  private readonly logger = new Logger(AmpService.name);

  constructor(private readonly httpService: HttpService) {}

  async createPayment(amount: number, currency: string, network: string) {
    const payload = {
      amount: Number(amount),
      token: currency,
      network: network,
      mode: 'direct',
      destionationWallet: this.DESTINATION_WALLET,
      returnURL: 'http://localhost/callback',
    };

    const headers = {
      'Content-Type': 'application/json',
      'x-api-key': this.API_KEY,
    };

    try {
      const response$ = this.httpService.post(
        `${this.AMP_BASE_URL}/api/checkout`,
        payload,
        { headers },
      );
      const response = await lastValueFrom(response$);
      return response.data;
    } catch (error) {
      this.logger.error(
        'Error creating payment session',
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  async monitorPayment(sessionId: string): Promise<any> {
    const headers = {
      'x-api-key': this.API_KEY,
    };

    const checkStatus = async (): Promise<any> => {
      try {
        const response$ = this.httpService.get(
          `${this.AMP_BASE_URL}/api/checkout/${sessionId}`,
          { headers },
        );
        const response = await lastValueFrom(response$);
        const result = response.data;

        if (result.data && result.data.status === 'paid') {
          this.logger.log('Payment successful');
          return result;
        } else {
          this.logger.log(
            `Payment status: ${result.data.status}. Retrying in 10 seconds...`,
          );
          // Wait 10 seconds and then check again
          return new Promise((resolve) => {
            setTimeout(async () => {
              const res = await checkStatus();
              resolve(res);
            }, 10000);
          });
        }
      } catch (error) {
        this.logger.error(
          'Error checking payment status',
          error.response?.data || error.message,
        );
        throw error;
      }
    };

    return checkStatus();
  }
}

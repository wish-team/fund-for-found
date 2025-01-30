// src/token/token.controller.ts

import {
  Controller,
  Get,
  Param,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CoinService } from '../coin/coin.service';

interface TokenInfo {
  name: string;
  symbol: string;
  supportedNetworks: string[];
}

@Controller('token')
export class TokenController {
  constructor(private readonly coinService: CoinService) {}

  /**
   * GET /token/{token}/gas-fee
   * Retrieves the current gas or transaction fee for the specified token and network.
   */
  @Get(':token/:network/gas-fee')
  async getGasFee(
    @Param('token') token: string,
    @Param('network') network: string,
  ): Promise<{ fee: number }> {
    try {
      const supportedNetworks = this.coinService.getSupportedNetworks(token);
      if (!supportedNetworks.includes(network.toLowerCase())) {
        throw new BadRequestException(
          `Network '${network}' is not supported for token '${token}'.`,
        );
      }

      const fee = await this.coinService.getGasFee(token, network);
      return { fee };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  /**
   * GET /token/{token}/
   * Retrieves general information about the specified token, including its name, symbol, and supported networks.
   */
  @Get(':token/')
  async getTokenInfo(@Param('token') token: string): Promise<TokenInfo> {
    try {
      const tokenDetails = this.coinService.getTokenDetails(token);
      if (!tokenDetails) {
        throw new NotFoundException(`Token '${token}' not found.`);
      }

      const supportedNetworks = this.coinService.getSupportedNetworks(token);
      return {
        name: tokenDetails.name,
        symbol: tokenDetails.symbol,
        supportedNetworks,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }
}

import { Injectable } from '@nestjs/common';
import { CoinStrategy } from './strategy/coin-strategy.interface';

interface Token {
  name: string;
  symbol: string;
  supportedNetworks: string[];
}

@Injectable()
export class CoinService {
  private readonly strategies: Map<string, CoinStrategy> = new Map();
  private readonly tokens: Record<string, Token> = {
    btc: {
      name: 'bitcoin',
      symbol: 'BTC',
      supportedNetworks: ['mainnet', 'testnet'],
    },
    eth: {
      name: 'ethereum',
      symbol: 'ETH',
      supportedNetworks: ['mainnet', 'ropsten', 'kovan'],
    },
    polygon: {
      name: 'matic',
      symbol: 'MATIC',
      supportedNetworks: ['polygon', 'mumbai'],
    },
    // Add more tokens as needed
  };
  constructor() {
    // Strategies will be registered dynamically via registerStrategy
  }

  /**
   * Register a strategy for a specific coin.
   * @param coin The coin's identifier (e.g., 'btc', 'eth').
   * @param strategy The strategy instance implementing CoinStrategy.
   */
  registerStrategy(coin: string, strategy: CoinStrategy): void {
    if (this.strategies.has(coin)) {
      throw new Error(`Strategy for coin '${coin}' is already registered.`);
    }
    this.strategies.set(coin, strategy);
  }

  /**
   * Get the appropriate strategy for a specific coin.
   * @param coin The coin's identifier (e.g., 'btc', 'eth').
   * @returns The corresponding CoinStrategy.
   */
  getStrategy(coin: string): CoinStrategy {
    const strategy = this.strategies.get(coin);
    if (!strategy) {
      throw new Error(`No strategy found for coin: ${coin}`);
    }
    return strategy;
  }
  /**
   * Retrieves the supported networks for the coin.
   * @returns An array of supported network names.
   */
  getSupportedNetworks(coin: string): string[] {
    const strategy = this.getStrategy(coin);
    return strategy.getNetwork();
  }

  async getGasFee(coin: string, network: string): Promise<number> {
    const strategy = this.getStrategy(coin);
    return await strategy.getGasFee(network);
  }

  getTokenDetails(token: string): { name: string; symbol: string } | null {
    const lowerToken = token.toLowerCase();
    if (this.tokens[lowerToken]) {
      const { name, symbol } = this.tokens[lowerToken];
      return { name, symbol };
    }
    return null;
  }
}

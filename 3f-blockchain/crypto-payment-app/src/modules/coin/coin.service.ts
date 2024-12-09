import { Injectable } from '@nestjs/common';
import { CoinStrategy } from './strategy/coin-strategy.interface';

@Injectable()
export class CoinService {
  private readonly strategies: Map<string, CoinStrategy> = new Map();

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
}

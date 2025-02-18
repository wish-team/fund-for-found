// src/coin/token_list.config.ts

export interface Token {
  name: string;
  symbol: string;
  // supportedNetworks?: string[]; // if you need
}

// Export an object mapping string keys to Token objects.
// The keys here ("bitcoin", "ethereum", etc.) must match how
// you'll look up the token (e.g., 'bitcoin', 'ethereum', 'matic').
export const tokenList: Record<string, Token> = {
  bitcoin: {
    name: 'bitcoin',
    symbol: 'BTC',
  },
  ethereum: {
    name: 'ethereum',
    symbol: 'ETH',
  },
  matic: {
    name: 'matic',
    symbol: 'MATIC',
  },
  // Add more tokens as needed
};

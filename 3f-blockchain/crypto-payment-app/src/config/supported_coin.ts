export const supportedCoins = [
  {
    type: 'crypto',
    coin: 'eth',
    networks: ['mainnet', 'ropsten', 'rinkeby'],
    api: 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID',
    gasMethod: 'eth_gasPrice',
    unit: 'ETH',
    priceUnit: 'wei',
  },
  {
    type: 'crypto',
    coin: 'btc',
    networks: ['mainnet'],
    api: 'https://api.blockcypher.com/v1/btc/main',
    gasMethod: 'transaction_fee',
    unit: 'BTC',
    priceUnit: 'satoshis',
  },
  {
    type: 'crypto',
    coin: 'bnb',
    networks: ['mainnet', 'testnet'],
    api: 'https://bsc-dataseed.binance.org/',
    gasMethod: 'eth_gasPrice',
    unit: 'BNB',
    priceUnit: 'wei',
  },
  {
    type: 'crypto',
    coin: 'sol',
    networks: ['mainnet', 'devnet'],
    api: 'https://api.mainnet-beta.solana.com',
    gasMethod: 'getFeeCalculatorForBlockhash',
    unit: 'SOL',
    priceUnit: 'lamports',
  },
  {
    type: 'crypto',
    coin: 'matic',
    networks: ['mainnet', 'mumbai'],
    api: 'https://rpc-mainnet.maticvigil.com',
    gasMethod: 'eth_gasPrice',
    unit: 'MATIC',
    priceUnit: 'wei',
  },
  {
    type: 'crypto',
    coin: 'ada',
    networks: ['mainnet'],
    api: 'https://cardano-mainnet.blockfrost.io/api/v0/fee',
    gasMethod: 'fee',
    unit: 'ADA',
    priceUnit: 'lovelace',
  },
  {
    type: 'crypto',
    coin: 'rial',
    network: ['zarinpal'],
    api: 'https://api.zarinpal.com/payment/',
    gasMethod: 'get_commission',
    unit: 'TOMAN',
    priceUnit: 'RIAL',
  },
];

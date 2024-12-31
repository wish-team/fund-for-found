export const supportedCoins = [
  {
    type: 'crypto',
    coin: 'eth',
    networks: ['mainnet', 'ropsten', 'rinkeby'],
    api: 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID',
    gasMethod: 'eth_gasPrice',
    unit: 'ETH',
    priceUnit: 'wei',
    derivationPath: "m/44'/60'/0'/0", // Ethereum derivation path
    transferMethod: 'ethers',
  },
  {
    type: 'crypto',
    coin: 'btc',
    networks: ['mainnet', 'testnet'],
    api: 'https://api.blockcypher.com/v1/btc/main',
    gasMethod: 'transaction_fee',
    unit: 'BTC',
    priceUnit: 'satoshis',
    derivationPath: "m/44'/0'/0'/0", // Bitcoin derivation path
    transferMethod: 'bitcoinjs',
  },
  {
    type: 'crypto',
    coin: 'bnb',
    networks: ['mainnet', 'testnet'],
    api: 'https://bsc-dataseed.binance.org/',
    gasMethod: 'eth_gasPrice',
    unit: 'BNB',
    priceUnit: 'wei',
    derivationPath: "m/44'/60'/0'/0", // Same as Ethereum
    transferMethod: 'ethers',
  },
  {
    type: 'crypto',
    coin: 'sol',
    networks: ['mainnet', 'devnet'],
    api: 'https://api.mainnet-beta.solana.com',
    gasMethod: 'getFeeCalculatorForBlockhash',
    unit: 'SOL',
    priceUnit: 'lamports',
    derivationPath: null, // Solana doesn't use BIP44 paths
    transferMethod: 'solanaWeb3',
  },
  {
    type: 'crypto',
    coin: 'ada',
    networks: ['mainnet'],
    api: 'https://cardano-mainnet.blockfrost.io/api/v0/fee',
    gasMethod: 'fee',
    unit: 'ADA',
    priceUnit: 'lovelace',
    derivationPath: "m/44'/1815'/0'/0", // Cardano derivation path
    transferMethod: 'cardanoSDK',
  },
  {
    type: 'fiat',
    coin: 'rial',
    networks: ['zarinpal'],
    api: 'https://api.zarinpal.com/payment/',
    gasMethod: 'get_commission',
    unit: 'TOMAN',
    priceUnit: 'RIAL',
    derivationPath: null, // Fiat doesn't use derivation paths
    transferMethod: 'fiatAPI',
  },
];

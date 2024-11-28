const supportedCoins = [
    {
      coin: 'eth',
      networks: ['mainnet', 'ropsten', 'rinkeby'],
      api: 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID',
      gasMethod: 'eth_gasPrice',
      unit: 'ETH',
      priceUnit: 'wei',
    },
    {
      coin: 'btc',
      networks: ['mainnet'],
      api: 'https://api.blockcypher.com/v1/btc/main',
      gasMethod: 'transaction_fee',
      unit: 'BTC',
      priceUnit: 'satoshis', // Bitcoin uses satoshis
    },
    {
      coin: 'bnb',
      networks: ['mainnet', 'testnet'],
      api: 'https://bsc-dataseed.binance.org/',
      gasMethod: 'eth_gasPrice', // Similar method to ETH as Binance Smart Chain is based on Ethereum
      unit: 'BNB',
      priceUnit: 'wei', // Same as ETH for gas price
    },
    {
      coin: 'sol',
      networks: ['mainnet', 'devnet'],
      api: 'https://api.mainnet-beta.solana.com',
      gasMethod: 'getFeeCalculatorForBlockhash',
      unit: 'SOL',
      priceUnit: 'lamports', // Solana uses lamports for gas prices
    },
    {
      coin: 'matic',
      networks: ['mainnet', 'mumbai'],
      api: 'https://rpc-mainnet.maticvigil.com',
      gasMethod: 'eth_gasPrice', // Polygon is based on Ethereum, so it uses eth_gasPrice
      unit: 'MATIC',
      priceUnit: 'wei',
    },
    {
      coin: 'ada',
      networks: ['mainnet'],
      api: 'https://cardano-mainnet.blockfrost.io/api/v0/fee',
      gasMethod: 'fee',
      unit: 'ADA',
      priceUnit: 'lovelace', // Cardano uses lovelace for gas prices
    },
    {
      coin: 'xrp',
      networks: ['mainnet'],
      api: 'https://api.xrpscan.com',
      gasMethod: 'get_fee',
      unit: 'XRP',
      priceUnit: 'drops', // XRP uses drops for gas prices
    },
    {
      coin: 'doge',
      networks: ['mainnet'],
      api: 'https://dogechain.info/api/v1/transaction/fee',
      gasMethod: 'fee',
      unit: 'DOGE',
      priceUnit: 'doge', // Dogecoin uses doge units
    },
    {
      coin: 'ltc',
      networks: ['mainnet'],
      api: 'https://api.blockcypher.com/v1/ltc/main',
      gasMethod: 'transaction_fee',
      unit: 'LTC',
      priceUnit: 'satoshis', // Litecoin uses satoshis
    },
    {
      coin: 'avax',
      networks: ['mainnet'],
      api: 'https://api.avax.network/ext/bc/C/rpc',
      gasMethod: 'eth_gasPrice', // Avalanche C-Chain uses a similar model to Ethereum
      unit: 'AVAX',
      priceUnit: 'wei',
    },
    {
        coin: 'rial',
        network : ['zarinpal'],
        api: 'https://api.zarinpal.com/payment/',
        gasMethod: 'get_commission',
        unit: 'TOMAN',
        price: "RIAL"
    }
  ];
  
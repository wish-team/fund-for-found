// async getTransactionCost(coin: string, network: string, gasLimit: number): Promise<string> {
//     // Fetch gas price based on coin and network
//     const gasDetails = await this.getGasDetails(coin, network);
  
//     // Process the gas price and calculate transaction cost
//     let transactionCost: number;
  
//     switch (coin) {
//       case 'eth':
//         if (network === 'mainnet') {
//           const gasPrice = parseInt(gasDetails.result, 16); // Ethereum gas price (Hex to decimal)
//           transactionCost = (gasPrice * gasLimit) / Math.pow(10, 18); // Convert from wei to ether
//           return `${transactionCost} ETH`;
//         }
//         break;
  
//       case 'btc':
//         if (network === 'mainnet') {
//           const transactionFee = gasDetails.tx_fee; // Example for Bitcoin
//           transactionCost = transactionFee * gasLimit;
//           return `${transactionCost} BTC`;
//         }
//         break;
  
//       // Add more cases for other coins and networks as needed
//       case 'bnb':
//         if (network === 'mainnet') {
//           const gasPrice = parseInt(gasDetails.result, 16); // For BNB (Binance Coin) Mainnet
//           transactionCost = (gasPrice * gasLimit) / Math.pow(10, 18); // Convert to BNB
//           return `${transactionCost} BNB`;
//         }
//         break;
  
//       // You can add logic for other coins such as Solana, Cardano, etc.
//       default:
//         throw new Error(`Unsupported coin or network: ${coin} - ${network}`);
//     }
//   }
  
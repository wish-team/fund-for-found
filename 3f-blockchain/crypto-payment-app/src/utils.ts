import axios from 'axios';

export class BlockchainUtils {
  /**
   * Fetch the current gas price for Ethereum and compatible networks (e.g., Binance Smart Chain)
   * @param apiUrl The API endpoint for fetching the gas price
   * @returns Gas price in wei (as a string)
   */
  static async getGasPrice(apiUrl: string): Promise<string> {
    try {
      const response = await axios.post(apiUrl, {
        jsonrpc: '2.0',
        id: 1,
        method: 'eth_gasPrice',
        params: [],
      });
      const gasPriceHex = response.data.result;
      const gasPrice = parseInt(gasPriceHex, 16); // Convert hex to decimal
      return gasPrice.toString(); // Return as a string in wei
    } catch (error) {
      throw new Error(`Failed to fetch gas price: ${error.message}`);
    }
  }
}

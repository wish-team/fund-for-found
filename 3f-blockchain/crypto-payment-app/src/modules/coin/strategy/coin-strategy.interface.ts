interface DerivedCredentials {
  derivedAddress: string;
  derivedPrivateKey: string;
}

export interface CoinStrategy {
  /**
   * Generate a derived address for the coin using a mnemonic and index.
   * @param mnemonic The master wallet's mnemonic.
   * @param index The index of the derived address.
   * @returns The derived address as a string.
   */
  generateAddress(mnemonic: string, index: number): DerivedCredentials;

  /**
   * Get the balance of a specific address.
   * @param address The address to check the balance for.
   * @returns The balance as a string.
   */
  getBalance(address: string): Promise<string>;

  /**
   * Send a transaction from one address to another.
   * @param from The sender's address.
   * @param to The recipient's address.
   * @param amount The amount to send (in the appropriate unit for the coin).
   * @param privateKey The private key of the sender's address.
   * @returns The transaction hash as a string.
   */
  sendTransaction(
    from: string,
    to: string,
    amount: string,
    privateKey: string,
  ): Promise<string>;
}

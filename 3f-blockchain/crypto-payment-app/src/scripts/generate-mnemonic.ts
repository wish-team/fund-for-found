import { Wallet } from 'ethers';

// Generate a new random mnemonic
const mnemonic = Wallet.createRandom().mnemonic.phrase;

console.log('Your new mnemonic:', mnemonic);

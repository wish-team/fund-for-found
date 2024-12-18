import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class AddressService {
  private masterWallet: ethers.Wallet;

  constructor() {
    this.masterWallet = new ethers.Wallet(process.env.MASTER_PRIVATE_KEY!);
  }

  generateUniqueAddress(index: number): string {
    const path = `m/44'/60'/0'/0/${index}`;
    const derivedWallet = ethers.Wallet.fromMnemonic(
      this.masterWallet.mnemonic!.phrase,
      path,
    );
    return derivedWallet.address;
  }
}

// src/modules/payment/dto/initiate-payment.dto.ts
import { IsInt } from 'class-validator';

export class InitiatePaymentDto {
  @IsInt()
  index: number;
}

// src/modules/payment/dto/process-payment.dto.ts
import { IsString } from 'class-validator';

export class ProcessPaymentDto {
  @IsString()
  transactionHash: string;
}

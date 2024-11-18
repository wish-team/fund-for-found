import { PartialType } from '@nestjs/swagger';
import { CreateCryptoWalletDto } from './create-crypto-wallet.dto';

export class UpdateCryptoWalletDto extends PartialType(CreateCryptoWalletDto) {}

import { PartialType } from '@nestjs/swagger';
import { CreateCryptoTransactionDto } from './create-crypto-transaction.dto';

export class UpdateCryptoTransactionDto extends PartialType(
  CreateCryptoTransactionDto,
) {}

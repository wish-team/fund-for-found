import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BrandController } from './brand/brand.controller';
import { BrandService } from './brand/brand.service';
import { PrismaService } from './prisma.service';
import { UserController } from './user/user.controller';
import { User } from './user/user';
import { UserService } from './user/user.service';
import { BrandModule } from './brand/brand.module';
import { FaqModule } from './faq/faq.module';
import { BrandDonationModule } from './brand-donation/brand-donation.module';
import { ImpactModule } from './impact/impact.module';
import { TierModule } from './tier/tier.module';
import { IndividualDonationModule } from './individual-donation/individual-donation.module';
import { CryptoTransactionModule } from './crypto-transaction/crypto-transaction.module';
import { DonationModule } from './donation/donation.module';
import { ShortSummaryModule } from './short-summary/short-summary.module';
import { BrandTagModule } from './brand-tag/brand-tag.module';
import { TagModule } from './tag/tag.module';
import { SocialMediaModule } from './social-media/social-media.module';
import { CryptoWalletModule } from './crypto-wallet/crypto-wallet.module';
import { TeamModule } from './team/team.module';
import { StoryModule } from './story/story.module';
import { UserModule } from './user/user.module';
import { BrandModule } from './brand/brand.module';

@Module({
  imports: [
    BrandModule,
    UserModule,
    StoryModule,
    TeamModule,
    CryptoWalletModule,
    SocialMediaModule,
    TagModule,
    BrandTagModule,
    ShortSummaryModule,
    DonationModule,
    CryptoTransactionModule,
    IndividualDonationModule,
    TierModule,
    ImpactModule,
    BrandDonationModule,
    FaqModule,
  ],
  controllers: [AppController, BrandController, UserController],
  providers: [AppService, BrandService, PrismaService, User, UserService],
})
export class AppModule {}

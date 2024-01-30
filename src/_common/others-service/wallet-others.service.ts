import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/_common/base-module/base-service.service";
import { CurrencyEntity } from "src/currency/entities/currency.entity";
import { CustomerEntity } from "src/customer/entities/customer.entity";
import { WalletEntity } from "src/wallet/entities/wallet.entity";
import { Repository } from "typeorm";

/// avoid circular dependancy
/// add to any  module providers and add WalletEntity to typeorm.forfeature([])
@Injectable()
export class WalletOthersService extends BaseService<WalletEntity> {
  constructor(
    @InjectRepository(WalletEntity)
    private walletRepository: Repository<WalletEntity>
  ) {
    super(walletRepository);
  }

  async createCustomerWallets(
    customer: CustomerEntity,
    currencies: CurrencyEntity[]
  ): Promise<WalletEntity[]> {
    const wallets: WalletEntity[] = currencies.map((currency) => {
      const wallet = this.walletRepository.create({
        customer,
        currency,
        balance: 0.0,
      });

      return wallet;
    });

    const createdWallets = await this.walletRepository.save(wallets);
    return createdWallets;
  }
}

import { BaseUserEntity } from "src/_common/entities/base-user-entity";
import { ExchangeRateEntity } from "src/rate/entities/rate.entity";
import { ExchangeRequestEntity } from "src/wallet/entities/exchange-request.entity";
import { WalletEntity } from "src/wallet/entities/wallet.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { CustomerAddressEntity } from "./address.entity";
import { TransactionEntity } from "src/wallet/entities/wallet-transactions.entity";

@Entity({ name: "customers" })
export class CustomerEntity extends BaseUserEntity {
  @OneToMany(() => WalletEntity, (wallet) => wallet.customer)
  wallets: WalletEntity[];
  @OneToMany(
    () => ExchangeRequestEntity,
    (exchangeRequest) => exchangeRequest.customer
  )
  exchangeRequests: ExchangeRequestEntity[];

  @OneToMany(
    () => CustomerAddressEntity,
    (customerAddress) => customerAddress.customer,
    {
      onDelete: "CASCADE",
    }
  )
  customer_address: CustomerAddressEntity[];
  @OneToMany(() => TransactionEntity, (transaction) => transaction.customer, {
    cascade: true,
  })
  transactions: TransactionEntity[];
}

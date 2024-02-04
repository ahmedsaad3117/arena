// src/entities/address.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { CustomerEntity } from "./customer.entity";
import { BaseEntity } from "src/_common/entities/base-entity";
import { ExchangeRequestEntity } from "src/wallet/entities/exchange-request.entity";

@Entity("customer_addresses")
export class CustomerAddressEntity extends BaseEntity {
  @Column()
  address: string;

  @Column()
  block: string;

  @Column()
  avenue: string;

  @Column()
  street: string;

  @Column()
  houseNumber: string;

  @Column({ nullable: true })
  floor: string;

  @Column({ nullable: true })
  apartment: string;

  @Column({ nullable: true })
  comment: string;

  @ManyToOne(() => CustomerEntity, (customer) => customer.customer_address, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "customer_id", referencedColumnName: "id" })
  customer: CustomerEntity;
  @OneToMany(
    () => ExchangeRequestEntity,
    (exchangeRequest) => exchangeRequest.shipping_address,
    { onDelete: "SET NULL" }
  )
  exchangeRequests: ExchangeRequestEntity[];
}

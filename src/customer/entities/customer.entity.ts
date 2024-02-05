import { BaseUserEntity } from 'src/_common/entities/base-user-entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { CustomerAddressEntity } from './address.entity';

@Entity({ name: 'customers' })
export class CustomerEntity extends BaseUserEntity {
  @OneToMany(
    () => CustomerAddressEntity,
    (customerAddress) => customerAddress.customer,
    {
      onDelete: 'CASCADE',
    },
  )
  customer_address: CustomerAddressEntity[];
}

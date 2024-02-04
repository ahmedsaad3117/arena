import { Module } from "@nestjs/common";
import { CustomerService } from "./providers/customer.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomerEntity } from "./entities/customer.entity";
import { CustomerController } from "./controllers/customer.controller";
import { CustomerAdminController } from "./controllers/customer.admin.controller";
import { CustomerAddressService } from "./providers/address.service";
import { CustomerAddressEntity } from "./entities/address.entity";
import { CustomerAddressController } from "./controllers/customer-address.controller";

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity, CustomerAddressEntity])],
  controllers: [
    CustomerController,
    CustomerAdminController,
    CustomerAddressController,
  ],
  providers: [CustomerService, CustomerAddressService],
  exports: [CustomerService],
})
export class CustomerModule {}

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/_common/base-module/base-service.service";
import { CustomerAddressEntity } from "src/customer/entities/address.entity";
import { Repository } from "typeorm";

/// avoid circular dependancy
/// add to any  module providers and add CustomerAddressEntity to typeorm.forfeature([])
@Injectable()
export class CustomerAddressOthersService extends BaseService<CustomerAddressEntity> {
  constructor(
    @InjectRepository(CustomerAddressEntity)
    private customerAddressRepository: Repository<CustomerAddressEntity>
  ) {
    super(customerAddressRepository);
  }
}

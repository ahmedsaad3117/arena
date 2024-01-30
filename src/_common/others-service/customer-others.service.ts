import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/_common/base-module/base-service.service";
import { CustomerEntity } from "src/customer/entities/customer.entity";
import { Repository } from "typeorm";

/// avoid circular dependancy
/// add to any  module providers and add CustomerEntity to TypeOrmModule.forfeature([])
// Then add it to provider
@Injectable()
export class CustomerOthersService extends BaseService<CustomerEntity> {
  constructor(
    @InjectRepository(CustomerEntity)
    private customerRepository: Repository<CustomerEntity>
  ) {
    super(customerRepository);
  }
}

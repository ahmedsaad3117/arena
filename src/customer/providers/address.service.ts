import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { BaseService } from "src/_common/base-module/base-service.service";
import { CustomerEntity } from "../entities/customer.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CustomerAddressEntity } from "../entities/address.entity";
import { UpdateAddressDto } from "../dto/update-address.dto";
import {
  createSuccessAutoTranslated,
  findOneSuccessAutoTranslated,
  updateSuccessAutoTranslated,
} from "src/_common/utils/successResponseMessage.util";
import { CustomerService } from "./customer.service";
import { CreateAddressDto } from "../dto/create-address.dto";
import { PageOptionsDto } from "src/_common/pagination/pageOption.dto";

@Injectable()
export class CustomerAddressService extends BaseService<CustomerAddressEntity> {
  constructor(
    @InjectRepository(CustomerAddressEntity)
    private customerAddressRepository: Repository<CustomerAddressEntity>,
    private readonly customerService: CustomerService
  ) {
    super(customerAddressRepository);
  }
  async create(customer: CustomerEntity, createAddressDto: CreateAddressDto) {
    const address = this.createEntity(createAddressDto);
    address.customer = customer;
    try {
      await this.saveEntityInstance(address);
      return createSuccessAutoTranslated();
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }
  async update(
    customer: CustomerEntity,
    updateAddressDto: UpdateAddressDto,
    id: number
  ) {
    let address: CustomerAddressEntity = await this.findOneEntityOrFail({
      where: { id, customer: { id: customer.id } },
    });

    try {
      Object.assign(address, updateAddressDto);
      // Save the address entity
      await this.saveEntityInstance(address);

      return updateSuccessAutoTranslated();
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  async findAddresses(customer_id: number, pageOptionsDto: PageOptionsDto) {
    let addresses = await this.findAllEntities(pageOptionsDto, {
      where: { customer: { id: customer_id } },
    });
    return addresses;
  }

  async remove(id: number) {
    return this.softRemoveEntity({ id });
  }
}

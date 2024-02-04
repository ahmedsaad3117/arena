import { Injectable } from "@nestjs/common";
import { CreateCustomerDto } from "../dto/create-customer.dto";
import { UpdateCustomerDto } from "../dto/update-customer.dto";
import { BaseService } from "src/_common/base-module/base-service.service";
import { CustomerEntity } from "../entities/customer.entity";
import { ILike, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { findOneSuccessAutoTranslated } from "src/_common/utils/successResponseMessage.util";
import { PageOptionsDto } from "src/_common/pagination/pageOption.dto";
import { FilterCustomerDto } from "../dto/filter-customer.dto";
import { explodeOrderByQuery } from "src/_common/utils/explode-order-by-query.util";
import { explodeCompleteUrl } from "src/_common/utils/explodeCompleteUrl.util";

@Injectable()
export class CustomerService extends BaseService<CustomerEntity> {
  constructor(
    @InjectRepository(CustomerEntity)
    private customerRepository: Repository<CustomerEntity>
  ) {
    super(customerRepository);
  }
  create(createCustomerDto: CreateCustomerDto) {
    return "This action adds a new customer";
  }

  findAll(
    pageOptionsDto: PageOptionsDto,
    filterCustomerDto: FilterCustomerDto
  ) {
    const finalObject: {} = {};
    let order: {} = {};
    let where = [];

    Object.keys(filterCustomerDto).forEach((key) => {
      switch (key) {
        case "orderBy":
          break;

        default:
          finalObject[key] = filterCustomerDto[key];
          break;
      }
    });
    const search = filterCustomerDto.search;

    if (search) {
      delete finalObject["search"];
      where.push({ ...finalObject, email: ILike(`%${search}%`) });
      where.push({ ...finalObject, name: ILike(`%${search}%`) });
      where.push({ ...finalObject, phone: ILike(`%${search}%`) });
    } else if (Object.keys(finalObject).length > 0) {
      where.push(finalObject);
    }
    let { orderBy } = filterCustomerDto;
    if (orderBy) {
      order = explodeOrderByQuery(orderBy);
    }
    console.log("whereeeeeeeeeeeee", where);

    return this.findAllEntities(pageOptionsDto, { where, order });
  }

  findOne(id: number) {
    return this.findOneByIdForController(id);
  }
  async findOneWithoutError(
    id: number = null,
    query = null
  ): Promise<CustomerEntity> {
    console.log("customer findOneWithoutError");

    if (!query) query = { id };
    const customer = await this.customerRepository.findOne({ where: query });
    return customer;
  }
  async findProfile(id: number) {
    const customer = await this.findOneEntityByIdOrFail(id);
    return findOneSuccessAutoTranslated(customer);
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    if (updateCustomerDto.avatar)
      updateCustomerDto.avatar = explodeCompleteUrl(updateCustomerDto.avatar);
    return this.updateEntity(id, updateCustomerDto);
  }

  remove(id: number) {
    return this.softRemoveEntity({ id });
  }
}

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/_common/base-module/base-service.service";
import { CurrencyEntity } from "src/currency/entities/currency.entity";
import { Repository } from "typeorm";

/// avoid circular dependancy
/// add to any  module providers and add CurrencyEntity to typeorm.forfeature([])
@Injectable()
export class CurrencyOthersService extends BaseService<CurrencyEntity> {
  constructor(
    @InjectRepository(CurrencyEntity)
    private currencyRepository: Repository<CurrencyEntity>
  ) {
    super(currencyRepository);
  }
}

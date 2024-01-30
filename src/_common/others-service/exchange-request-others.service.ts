import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/_common/base-module/base-service.service";
import { ExchangeRequestEntity } from "src/wallet/entities/exchange-request.entity";
import { QueryRunner, Repository } from "typeorm";

/// avoid circular dependancy
/// add to any  module providers and add ExchangeRequestEntity to typeorm.forfeature([])
@Injectable()
export class ExchangeRequestOthersService extends BaseService<ExchangeRequestEntity> {
  constructor(
    @InjectRepository(ExchangeRequestEntity)
    private exchangeRequestRepository: Repository<ExchangeRequestEntity>
  ) {
    super(exchangeRequestRepository);
  }

  async markExchangeRequestAsPayed(
    exchangeRequest: ExchangeRequestEntity,
    queryRunner?: QueryRunner
  ) {
    exchangeRequest.isPayed = true;
    return this.saveEntityInstanceByQueryRunner(exchangeRequest, queryRunner);
  }
}

import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateDayOffDto } from '../dto/create-day-off.dto';
import { UpdateDayOffDto } from '../dto/update-day-off.dto';
import { BaseService } from '@app/_common/base-module/base-service.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DayOff } from '../entities/day-off.entity';
import {
  createSuccessAutoTranslated,
  findOneSuccessAutoTranslated,
} from '@app/_common/utils/successResponseMessage.util';
import { PageOptionsDto } from '@app/_common/pagination/pageOption.dto';

@Injectable()
export class DayOffService extends BaseService<DayOff> {
  constructor(
    @InjectRepository(DayOff)
    private dayOffRepository: Repository<DayOff>,
  ) {
    super(dayOffRepository);
  }
  async create(createDayOffDto: CreateDayOffDto) {
    const dayOff = this.createEntity(createDayOffDto);
    try {
      await this.saveEntityInstance(dayOff);
      return createSuccessAutoTranslated();
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  findAll(pageOptionsDto: PageOptionsDto) {
    return this.findAllEntities(pageOptionsDto);
  }

  async findOne(id: number) {
    const dayoff = await this.findOneEntityByIdOrFail(id);
    return findOneSuccessAutoTranslated(dayoff);
  }

  update(id: number, updateDayOffDto: UpdateDayOffDto) {
    return this.updateEntity(id, updateDayOffDto);
  }

  remove(id: number) {
    return this.removeEntity({ id });
  }
}

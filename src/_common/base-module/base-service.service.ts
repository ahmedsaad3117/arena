import {
  Injectable,
  Logger,
  NotFoundException,
  Type,
  UnprocessableEntityException,
} from "@nestjs/common";
import {
  DeepPartial,
  DeleteOneModel,
  FindManyOptions,
  FindOneOptions,
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsWhere,
  QueryRunner,
  Repository,
} from "typeorm";
import {
  cantSaveErrorAutoTranslatedString,
  createSuccessAutoTranslated,
  defaultErrorAutoTranslatedString,
  deleteErrorAutoTranslated,
  deleteSuccessAutoTranslated,
  findAllSuccessAutoTranslated,
  findOneSuccessAutoTranslated,
  notFoundErrorAutoTranslatedString,
  updateErrorAutoTranslatedString,
  updateSuccessAutoTranslated,
} from "../utils/successResponseMessage.util";
import { PageOptionsDto } from "../pagination/pageOption.dto";
import { PageMetaDto } from "../pagination/page-meta.dto";
import { PageDto, PageDtoAutoTranslated } from "../pagination/page.dto";

export abstract class BaseService<T> {
  protected readonly logger: Logger;

  constructor(protected readonly baseRepository: Repository<T>) {
    this.logger = new Logger(BaseService.name);
  }

  //-------------------------------------------------- Create -----------------------------------------------------------------------------
  async createAndSaveEntity(entity: Partial<T>): Promise<{ message: string }> {
    try {
      const createdEntity = this.createEntity(entity);
      console.log(createdEntity);

      const savedEntity: T = await this.baseRepository.save(createdEntity);
      //  return savedEntity;
      return createSuccessAutoTranslated();
    } catch (error) {
      this.logger.warn(`Can't save entity =>  ${error.message}`);
      throw new UnprocessableEntityException(
        cantSaveErrorAutoTranslatedString()
      );
    }
  }
  createEntity(entity: Partial<T>): T {
    const createdEntity = this.baseRepository.create(entity as DeepPartial<T>);
    console.log(createdEntity);
    return createdEntity;
  }
  async saveEntityInstance(entity: T) {
    try {
      const savedEntity: T = await this.baseRepository.save(entity);
      return savedEntity;
    } catch (error) {
      this.logger.warn(`Can't save entity =>  ${error.message}`);
      throw new UnprocessableEntityException(
        cantSaveErrorAutoTranslatedString()
      );
    }
  }
  async saveEntityInstanceByQueryRunner(entity: T, queryRunner?: QueryRunner) {
    try {
      let savedEntity: T;
      if (queryRunner) {
        savedEntity = await queryRunner.manager.save(entity);
        return savedEntity;
      }
      savedEntity = await this.baseRepository.save(entity);
      return savedEntity;
    } catch (error) {
      this.logger.warn(`Can't save entity =>  ${error.message}`);
      throw new UnprocessableEntityException(
        cantSaveErrorAutoTranslatedString()
      );
    }
  }

  //-------------------------------------------------- FindAll ------------------------------------------------------------------------
  async findAllEntities(
    pageOptionsDto: PageOptionsDto,
    findManyOptions: FindManyOptions = {}
  ) {
    findManyOptions.loadEagerRelations = false;
    findManyOptions.take = pageOptionsDto.take;
    findManyOptions.skip = (pageOptionsDto.page - 1) * pageOptionsDto.take;
    const [entities, total] = await this.baseRepository.findAndCount(
      findManyOptions
    );
    const pageMetaDto = new PageMetaDto({
      itemsPerPage: entities.length,
      total,
      pageOptionsDto,
    });

    return new PageDtoAutoTranslated(entities, pageMetaDto);
  }
  async findAllEntitiesWithoutPagination(findManyOptions?: FindManyOptions) {
    const entities = await this.baseRepository.find(findManyOptions);
    return entities;
  }
  async findAllEntitiesWithoutPaginationForController(
    findManyOptions: FindManyOptions
  ) {
    const entities = await this.findAllEntitiesWithoutPagination(
      findManyOptions
    );
    return findAllSuccessAutoTranslated(entities);
  }
  //-------------------------------------------------- FindOne -------------------------------------------------------------------------
  async findOneEntity(findOneOptions: FindOneOptions): Promise<T> {
    try {
      const entity = await this.baseRepository.findOne(findOneOptions);
      return entity;
    } catch (error) {
      this.logger.warn("Entity not found with query:", findOneOptions.where);
      throw new UnprocessableEntityException(
        defaultErrorAutoTranslatedString()
      );
    }
  }

  async findOneEntityOrFail(findOneOptions: FindOneOptions<T>): Promise<T> {
    const entity = await this.findOneEntity(findOneOptions);
    if (!entity)
      throw new NotFoundException(notFoundErrorAutoTranslatedString());
    return entity;
  }
  async findOneEntityById(id: number, findOneOptions: FindOneOptions) {
    findOneOptions["where"] = { id };
    const entity = await this.findOneEntity(findOneOptions);
    return entity;
  }
  async findOneEntityByIdOrFail(
    id: number,
    findOneOptions: FindOneOptions = {}
  ) {
    findOneOptions["where"] = { id };
    const entity = await this.findOneEntityOrFail(findOneOptions);
    return entity;
  }
  async findOneByIdForController(id: number) {
    const entity = await this.findOneEntityByIdOrFail(id);
    return findOneSuccessAutoTranslated(entity);
  }
  //-------------------------------------------------- Update -------------------------------------------------------------------------
  async updateEntity(id: number, updateEntity: Partial<T>) {
    const entity = await this.findOneEntityByIdOrFail(id);
    Object.assign(entity, updateEntity);
    try {
      await this.saveEntityInstance(entity);

      return updateSuccessAutoTranslated();
    } catch (error) {
      this.logger.warn("Cant update entity", error.message);
      throw new UnprocessableEntityException(updateErrorAutoTranslatedString());
    }
  }
  //-------------------------------------------------- Remove -------------------------------------------------------------------------
  async removeEntity(where: FindOptionsWhere<T>) {
    let findOneOptions: FindOneOptions = { where };
    const entity = await this.findOneEntityOrFail(findOneOptions);
    return this.hardRemoveEntityInstance(entity);
  }
  async softRemoveEntity(where: FindOptionsWhere<T>) {
    let findOneOptions: FindOneOptions = { where };
    console.log(findOneOptions);

    const entity = await this.findOneEntityOrFail(findOneOptions);
    return this.softRemoveEntityInstance(entity);
  }
  async softRemoveEntityInstance(entity: T) {
    try {
      await this.baseRepository.softRemove(entity);
      return deleteSuccessAutoTranslated();
    } catch (error) {
      this.logger.warn("Cant delete entity", error.message);
      throw new UnprocessableEntityException(deleteErrorAutoTranslated());
    }
  }
  async hardRemoveEntityInstance(entity: T) {
    try {
      await this.baseRepository.remove(entity);
      return deleteSuccessAutoTranslated();
    } catch (error) {
      this.logger.warn("Cant delete entity", error.message);
      throw new UnprocessableEntityException(deleteErrorAutoTranslated());
    }
  }
  //--------------------------------------------------- Statistics -------------------------
  async countEntities(findManyOptions?: FindManyOptions<T>) {
    const count = await this.baseRepository.count(findManyOptions);
    return count;
  }
  async findLastEntities(
    take: number = 5,
    order: FindOptionsOrder<T>,
    relations?: FindOptionsRelations<T>
  ) {
    const last = await this.baseRepository.find({
      order,
      take,
      relations,
    });
    return last;
  }
  async findLastInsertedEntities(
    take: number,
    relations?: FindOptionsRelations<T>
  ) {
    let order = {};
    order["created_at"] = "DESC";
    return this.findLastEntities(take, order, relations);
  }
}

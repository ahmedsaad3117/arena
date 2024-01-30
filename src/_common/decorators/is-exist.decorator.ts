import { UnprocessableEntityException } from "@nestjs/common";
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { DBConnection } from "src/_common/database/connection";

@ValidatorConstraint({ async: true })
export class IsExistConstraint implements ValidatorConstraintInterface {
  private db = new DBConnection();

  async validate(value: any, args: ValidationArguments) {
    const entity = args.object[`class_entity_${args.property}`];

    // create connection to database
    const connection = await this.db.connect();
    if (!this.db) throw new UnprocessableEntityException();

    // fetch item by specific condition
    const item = await connection
      .getRepository(entity)
      .findOneBy({ id: value });

    return !!item;
  }
}

export function IsExist(
  entity: Function,
  property?: string,
  validationOptions?: ValidationOptions
) {
  validationOptions = {
    ...{ message: "data is not exists with this $property." },
    ...validationOptions,
  };
  return function (object: Object, propertyName: string) {
    const prop = property || propertyName;
    object[`class_entity_${prop}`] = entity;
    registerDecorator({
      target: object.constructor,
      propertyName: prop,
      options: validationOptions,
      constraints: [],
      validator: IsExistConstraint,
    });
  };
}

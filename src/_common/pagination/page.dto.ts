import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { PageMetaDto } from './page-meta.dto';
import { findAllPagenteSuccessAutoTranslated } from '../utils/successResponseMessage.util';

export class PageDto<T> {
  @IsArray()
  @ApiProperty({ isArray: true })
  readonly data: T[] | {};

  @IsString()
  @ApiProperty({ type: String })
  readonly message: T[] | {};

  @ApiProperty({ type: () => PageMetaDto })
  readonly meta: PageMetaDto;

  constructor(message: string, data: T[] | {}, meta: PageMetaDto) {
    this.message = message;
    this.meta = meta;
    this.data = data;
  }
}
export class PageDtoAutoTranslated<T> extends PageDto<T> {
  constructor(data: T[] | {}, meta: PageMetaDto) {
    const { message } = findAllPagenteSuccessAutoTranslated();
    super(message, data, meta);
  }
}

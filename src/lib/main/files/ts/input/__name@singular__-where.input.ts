import { DeepNullable } from '@app/graphql-type/nullable.interface';
import { ToWhereInputType } from '@app/graphql-type/to-where-input-type';
import { InputType, OmitType } from '@nestjs/graphql';
import { FindOptionsWhere } from 'typeorm';

import { <%= classify(singular(name)) %> } from '../<%= singular(name) %>.entity';

@InputType()
export class <%= classify(singular(name)) %>WhereInput extends OmitType(ToWhereInputType(<%= classify(singular(name)) %>), []) {
  toFindOptionsWhere(): DeepNullable<FindOptionsWhere<<%= classify(singular(name)) %>>> {
    const { ...where } = this;

    return { ...where };
  }
}

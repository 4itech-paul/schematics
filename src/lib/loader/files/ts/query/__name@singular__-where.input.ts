import { InputType, OmitType } from '@nestjs/graphql';
import { FindOptionsWhere } from 'typeorm';

import { DeepNullable } from '../../common/nullable.interface';
import { ToWhereInputType } from '../../common/to-where-input-type';
import { <%= classify(singular(name)) %> } from '../<%= singular(name) %>.entity';

@InputType()
export class <%= classify(singular(name)) %>WhereInput extends OmitType(
  ToWhereInputType(<%= classify(singular(name)) %>),
  [],
) {
  toFindOptionsWhere(): DeepNullable<FindOptionsWhere<<%= classify(singular(name)) %>>> {
    const { ...where } = this;
    return { ...where };
  }
}

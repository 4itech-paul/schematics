import { InputType, OmitType } from '@nestjs/graphql';
import { FindOptionsWhere } from 'typeorm';

import { ToWhereInputType } from '../../common/to-where-input-type';
import { <%= classify(singular(name)) %> } from '../<%= singular(name) %>.entity';

@InputType()
export class <%= classify(singular(name)) %>WhereInput extends OmitType(
  ToWhereInputType(<%= classify(singular(name)) %>),
  [],
) {
  toFindOptionsWhere(): FindOptionsWhere<<%= classify(singular(name)) %>> {
    const { ...where } = this;
    return { ...where };
  }
}

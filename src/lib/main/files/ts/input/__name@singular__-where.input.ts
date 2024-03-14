import { ToWhereInputType } from '@app/graphql-type/to-where-input-type';
import { InputType, OmitType } from '@nestjs/graphql';
import { Nullable } from 'apps/main/src/common/base.service';
import { FindOptionsWhere } from 'typeorm';

import { <%= classify(singular(name)) %> } from '../<%= singular(name) %>.entity';

@InputType()
export class <%= classify(singular(name)) %>WhereInput extends OmitType(ToWhereInputType(<%= classify(singular(name)) %>), []) {
  toFindOptionsWhere(): Nullable<FindOptionsWhere<<%= classify(singular(name)) %>>> | undefined {
    const { ...where } = this;

    return { ...where };
  }
}

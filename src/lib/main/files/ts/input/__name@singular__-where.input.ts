import { PartialAndOmitType } from '@app/graphql-type/partial-and-omit-type';
import { InputType } from '@nestjs/graphql';
import { Nullable } from 'apps/main/src/common/base.service';
import { FindOptionsWhere } from 'typeorm';

import { <%= singular(classify(name)) %> } from '../<%= singular(name) %>.entity';

@InputType()
export class <%= singular(classify(name)) %>WhereInput extends PartialAndOmitType(<%= singular(classify(name)) %>, []) {
  toFindOptionsWhere(): Nullable<FindOptionsWhere<<%= singular(classify(name)) %>>> | undefined {
    const { ...where } = this;

    return { ...where };
  }
}

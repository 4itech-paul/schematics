import { InputType } from '@nestjs/graphql';
import { Nullable } from 'src/common/interface/nullable.interface';
import { PartialAndOmitType } from 'src/common/partial-and-omit-type';
import { FindOptionsWhere } from 'typeorm';

import { <%= classify(singular(name)) %> } from '../<%= singular(name) %>.entity';

@InputType()
export class <%= classify(singular(name)) %>WhereInput extends PartialAndOmitType(<%= classify(singular(name)) %>, []) {
  toFindOptionsWhere(): Nullable<FindOptionsWhere<<%= classify(singular(name)) %>>> | undefined {
    const { ...where } = this;
    return { ...where };
  }
}

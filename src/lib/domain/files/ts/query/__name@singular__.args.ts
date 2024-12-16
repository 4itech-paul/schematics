import { ArgsType } from '@nestjs/graphql';

import { TypeField } from '../../common/type-field.decorator';
import { <%= classify(singular(name)) %>WhereInput } from './<%= singular(name) %>-where.input';

@ArgsType()
export class <%= classify(singular(name)) %>Args {
  @TypeField(() => [<%= classify(singular(name)) %>WhereInput], {
    description: '查詢條件',
    defaultValue: [],
  })
  where: <%= classify(singular(name)) %>WhereInput[] = [];
}

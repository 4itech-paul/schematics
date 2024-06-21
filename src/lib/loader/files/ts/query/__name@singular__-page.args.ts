import { ArgsType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { NodePageArgs } from '../../common/node.page.args';
import { TypeField } from '../../common/type-field.decorator';
import { <%= classify(singular(name)) %>OrderInput } from './<%= singular(name) %>-order.input';
import { <%= classify(singular(name)) %>WhereInput } from './<%= singular(name) %>-where.input';

@ArgsType()
export class <%= classify(singular(name)) %>PageArgs extends NodePageArgs {
  @TypeField(() => <%= classify(singular(name)) %>OrderInput, {
    description: '排序欄位與方式',
    defaultValue: new <%= classify(singular(name)) %>OrderInput(),
  })
  order: <%= classify(singular(name)) %>OrderInput = new <%= classify(singular(name)) %>OrderInput();

  @TypeField(() => [<%= classify(singular(name)) %>WhereInput], {
    description: '查詢條件',
    nullable: true,
  })
  where?: Maybe<<%= classify(singular(name)) %>WhereInput[]>;
}

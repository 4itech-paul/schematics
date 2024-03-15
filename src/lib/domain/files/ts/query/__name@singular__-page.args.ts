import { ArgsType } from '@nestjs/graphql';
import { NodePageArgs } from 'src/common/node.page.args';
import { TypeField } from 'src/common/type-field.decorator';

import { <%= classify(singular(name)) %>OrderInput } from './<%= singular(name) %>-order.input';
import { <%= classify(singular(name)) %>WhereInput } from './<%= singular(name) %>-where.input';

@ArgsType()
export class <%= classify(singular(name)) %>PageArgs extends NodePageArgs {
  @TypeField(() => <%= classify(singular(name)) %>OrderInput, {
    description: '排序欄位與方式',
    defaultValue: new <%= classify(singular(name)) %>OrderInput(),
  })
  order: <%= classify(singular(name)) %>OrderInput = new <%= classify(singular(name)) %>OrderInput();

  @TypeField(() => <%= classify(singular(name)) %>WhereInput, {
    description: '查詢條件',
    defaultValue: new <%= classify(singular(name)) %>WhereInput(),
  })
  where: <%= classify(singular(name)) %>WhereInput = new <%= classify(singular(name)) %>WhereInput();
}

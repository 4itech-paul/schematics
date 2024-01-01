import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { NodePageArgs } from 'src/common/query/node.page.args';

import { <%= classify(singular(name)) %>OrderInput } from './<%= singular(name) %>-order.input';
import { <%= classify(singular(name)) %>WhereInput } from './<%= singular(name) %>-where.input';

@ArgsType()
export class <%= classify(singular(name)) %>PageArgs extends NodePageArgs {
  @ValidateNested()
  @Type(() => <%= classify(singular(name)) %>OrderInput)
  @Field(() => <%= classify(singular(name)) %>OrderInput, {
    description: '排序欄位與方式',
    defaultValue: new <%= classify(singular(name)) %>OrderInput(),
  })
  order: <%= classify(singular(name)) %>OrderInput = new <%= classify(singular(name)) %>OrderInput();

  @ValidateNested()
  @Type(() => <%= classify(singular(name)) %>WhereInput)
  @Field(() => <%= classify(singular(name)) %>WhereInput, {
    description: '查詢條件',
    defaultValue: new <%= classify(singular(name)) %>WhereInput(),
  })
  where: <%= classify(singular(name)) %>WhereInput = new <%= classify(singular(name)) %>WhereInput();
}

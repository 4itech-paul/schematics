import { Field, InputType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { NodeOrderEnum } from 'src/common/query/node-order.enum';
import { NodeOrderInput } from 'src/common/query/node-order.input';

@InputType()
export class <%= classify(singular(name)) %>OrderInput extends NodeOrderInput {
  @Field(() => NodeOrderEnum, { nullable: true })
  exampleField?: Maybe<NodeOrderEnum>;
}

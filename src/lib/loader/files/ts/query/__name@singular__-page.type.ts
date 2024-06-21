import { Field, ObjectType } from '@nestjs/graphql';

import { NodePage } from '../../common/node-page.type';
import { <%= classify(singular(name)) %> } from '../<%= singular(name) %>.entity';

@ObjectType({
  implements: [NodePage],
})
export class <%= classify(singular(name)) %>Page implements NodePage<<%= classify(singular(name)) %>> {
  @Field(() => [<%= classify(singular(name)) %>], { description: 'Nodes in this page' })
  nodes!: <%= classify(singular(name)) %>[];
}

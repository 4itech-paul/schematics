import { Field, ObjectType } from '@nestjs/graphql';
import { MainDaoNodePage } from 'apps/main/src/common/main-dao-node-page.type';

import { <%= classify(singular(name)) %> } from '../<%= singular(name) %>.entity';

@ObjectType('<%= classify(singular(name)) %>Page', {
  implements: [MainDaoNodePage],
})
export class <%= classify(singular(name)) %>PageType implements MainDaoNodePage<<%= classify(singular(name)) %>> {
  @Field(() => [<%= classify(singular(name)) %>], { description: 'Nodes in this page' })
  nodes!: <%= classify(singular(name)) %>[];
}

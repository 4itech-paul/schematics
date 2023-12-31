import { Field, ObjectType } from '@nestjs/graphql';
import { MainDaoNodePage } from 'apps/main/src/common/main-dao-node-page.type';

import { <%= singular(classify(name)) %> } from '../<%= singular(lowercased(name)) %>.entity';

@ObjectType('<%= singular(classify(name)) %>Page', {
  implements: [MainDaoNodePage],
})
export class <%= singular(classify(name)) %>PageType implements MainDaoNodePage<<%= singular(classify(name)) %>> {
  @Field(() => [<%= singular(classify(name)) %>], { description: 'Nodes in this page' })
  nodes!: <%= singular(classify(name)) %>[];
}

import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { <%= classify(singular(entities)) %> } from '../<%= singular(entities) %>.entity';

@InterfaceType()
export abstract class <%= classify(entities) %>By<%= classify(by) %> {
  @Field(() => ID)
  id!: string;

  @Field(() => [<%= classify(singular(entities)) %>], { nullable: true })
  <%= lowercased(entities) %>?: Maybe<<%= classify(singular(entities)) %>[]>;
}

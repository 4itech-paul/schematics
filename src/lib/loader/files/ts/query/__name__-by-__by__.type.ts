import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { <%= classify(singular(name)) %> } from '../<%= singular(name) %>.entity';

@InterfaceType()
export abstract class <%= classify(name) %>By<%= classify(by) %> {
  @Field(() => ID)
  id!: string;

  @Field(() => [<%= classify(singular(name)) %>], { nullable: true })
  <%= lowercased(name) %>?: Maybe<<%= classify(singular(name)) %>[]>;
}

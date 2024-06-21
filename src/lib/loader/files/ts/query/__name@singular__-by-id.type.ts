import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { <%= classify(singular(name)) %> } from '../<%= singular(name) %>.entity';

@InterfaceType()
export abstract class <%= classify(singular(name)) %>ById {
  @Field(() => ID, { nullable: true })
  <%= lowercased(singular(name)) %>Id?: Maybe<string>;

  @Field(() => <%= classify(singular(name)) %>, { nullable: true })
  <%= lowercased(singular(name)) %>?: Maybe<<%= classify(singular(name)) %>>;
}

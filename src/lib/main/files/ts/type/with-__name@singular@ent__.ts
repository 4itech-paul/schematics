import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { <%= classify(singular(name)) %> } from '../<%= singular(name) %>.entity';

@InterfaceType()
export abstract class With<%= classify(singular(name)) %> {
  @Field(() => ID, { nullable: true, description: '代理商 ID' })
  <%= lowercased(singular(name)) %>Id?: Maybe<string>;

  @Field(() => <%= classify(singular(name)) %>, { nullable: true, description: '代理商' })
  <%= lowercased(singular(name)) %>?: Maybe<<%= classify(singular(name)) %>>;
}

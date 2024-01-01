import { Field, ObjectType } from '@nestjs/graphql';

import { <%= classify(singular(name)) %> } from '../<%= singular(name) %>.entity';

@ObjectType()
export class Update<%= classify(singular(name)) %>Output {
  @Field(() => <%= classify(singular(name)) %>)
  <%= lowercased(singular(name)) %>!: <%= classify(singular(name)) %>;
}

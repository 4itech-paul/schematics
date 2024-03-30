import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { Create<%= classify(singular(name)) %>Input } from './create-<%= singular(name) %>.input';

@InputType()
export class Update<%= classify(singular(name)) %>Input extends OmitType(
  PartialType(Create<%= classify(singular(name)) %>Input),
  [],
) {
  @Field(() => ID)
  id!: string;
}

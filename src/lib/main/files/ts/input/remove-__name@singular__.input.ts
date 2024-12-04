import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class Remove<%= classify(singular(name)) %>Input {
  @Field(() => ID)
  id!: string;
}

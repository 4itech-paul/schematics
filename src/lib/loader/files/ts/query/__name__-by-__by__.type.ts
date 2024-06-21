import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0010 } from '../domain-0010.entity';

@InterfaceType()
export abstract class Domain0010sByDomain0009Id {
  @Field(() => ID)
  id!: string;

  @Field(() => [Domain0010], { nullable: true })
  domain0010s?: Maybe<Domain0010[]>;
}

import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0010 } from './domain-0010.entity';
import { Domain0010sByDomain0009IdLoader } from './domain-0010s-by-domain-0009-id.loader';
import { Domain0010sByDomain0009Id } from './query/domain-0010s-by-domain-0009-id.type';

@Resolver(() => Domain0010sByDomain0009Id)
export class Domain0010sByDomain0009IdResolver {
  constructor(private readonly loader: Domain0010sByDomain0009IdLoader) {}

  @ResolveField(() => [Domain0010], { nullable: true })
  async domain0010s(
    @Parent() { id, domain0010s }: Domain0010sByDomain0009Id,
  ): Promise<Maybe<Domain0010[]>> {
    if (domain0010s) return domain0010s;
    return this.loader.load(id);
  }
}

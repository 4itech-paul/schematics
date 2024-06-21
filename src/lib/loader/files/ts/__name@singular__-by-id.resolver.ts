import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { <%= classify(singular(name)) %>ByIdLoader } from './<%= singular(name) %>-by-id.loader';
import { <%= classify(singular(name)) %> } from './<%= singular(name) %>.entity';
import { <%= classify(singular(name)) %>ById } from './query/<%= singular(name) %>-by-id.type';

@Resolver(() => <%= classify(singular(name)) %>ById)
export class <%= classify(singular(name)) %>ByIdResolver {
  constructor(private readonly loader: <%= classify(singular(name)) %>ByIdLoader) {}

  @ResolveField(() => <%= classify(singular(name)) %>, { nullable: true })
  async <%= lowercased(singular(name)) %>(
    @Parent() { <%= lowercased(singular(name)) %>Id, <%= lowercased(singular(name)) %> }: <%= classify(singular(name)) %>ById,
  ): Promise<Maybe<<%= classify(singular(name)) %>>> {
    if (<%= lowercased(singular(name)) %>) return <%= lowercased(singular(name)) %>;
    if (<%= lowercased(singular(name)) %>Id) return this.loader.load(<%= lowercased(singular(name)) %>Id);
    return null;
  }
}

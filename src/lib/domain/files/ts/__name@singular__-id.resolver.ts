import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { <%= classify(singular(name)) %>IdLoader } from './<%= singular(name) %>-id.loader';
import { <%= classify(singular(name)) %> } from './<%= singular(name) %>.entity';
import { <%= classify(singular(name)) %>Id } from './query/<%= singular(name) %>-id.type';

@Resolver(() => <%= classify(singular(name)) %>Id)
export class <%= classify(singular(name)) %>IdResolver {
  constructor(private readonly loader: <%= classify(singular(name)) %>IdLoader) {}

  @ResolveField(() => <%= classify(singular(name)) %>, { nullable: true })
  async <%= lowercased(singular(name)) %>(
    @Parent() { <%= lowercased(singular(name)) %>Id, <%= lowercased(singular(name)) %> }: <%= classify(singular(name)) %>Id,
  ): Promise<Maybe<<%= classify(singular(name)) %>>> {
    if (<%= lowercased(singular(name)) %>) return <%= lowercased(singular(name)) %>;
    if (<%= lowercased(singular(name)) %>Id) return this.loader.load(<%= lowercased(singular(name)) %>Id);
    return null;
  }
}

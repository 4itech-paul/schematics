import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { <%= classify(singular(entities)) %> } from './<%= singular(entities) %>.entity';
import { <%= classify(entities) %>By<%= classify(by) %>Loader } from './<%= entities %>-by-<%= by %>.loader';
import { <%= classify(entities) %>By<%= classify(by) %> } from './query/<%= entities %>-by-<%= by %>.type';

@Resolver(() => <%= classify(entities) %>By<%= classify(by) %>)
export class <%= classify(entities) %>By<%= classify(by) %>Resolver {
  constructor(private readonly loader: <%= classify(entities) %>By<%= classify(by) %>Loader) {}

  @ResolveField(() => [<%= classify(singular(entities)) %>], { nullable: true })
  async <%= lowercased(entities) %>(
    @Parent() { id, <%= lowercased(entities) %> }: <%= classify(entities) %>By<%= classify(by) %>,
  ): Promise<Maybe<<%= classify(singular(entities)) %>[]>> {
    if (<%= lowercased(entities) %>) return <%= lowercased(entities) %>;
    return this.loader.load(id);
  }
}

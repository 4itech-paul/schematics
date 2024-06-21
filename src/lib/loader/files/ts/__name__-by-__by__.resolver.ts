import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { <%= classify(singular(name)) %> } from './<%= singular(name) %>.entity';
import { <%= classify(name) %>By<%= classify(by) %>Loader } from './<%= name %>-by-<%= by %>.loader';
import { <%= classify(name) %>By<%= classify(by) %> } from './query/<%= name %>-by-<%= by %>.type';

@Resolver(() => <%= classify(name) %>By<%= classify(by) %>)
export class <%= classify(name) %>By<%= classify(by) %>Resolver {
  constructor(private readonly loader: <%= classify(name) %>By<%= classify(by) %>Loader) {}

  @ResolveField(() => [<%= classify(singular(name)) %>], { nullable: true })
  async <%= lowercased(name) %>(
    @Parent() { id, <%= lowercased(name) %> }: <%= classify(name) %>By<%= classify(by) %>,
  ): Promise<Maybe<<%= classify(singular(name)) %>[]>> {
    if (<%= lowercased(name) %>) return <%= lowercased(name) %>;
    return this.loader.load(id);
  }
}

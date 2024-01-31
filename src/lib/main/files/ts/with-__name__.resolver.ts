import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { <%= classify(singular(name)) %>By<%= classify(singular(name)) %>IdLoader } from './<%= singular(name) %>-by-<%= singular(name) %>-id.loader';
import { <%= classify(singular(name)) %> } from './<%= singular(name) %>.entity';
import { With<%= classify(singular(name)) %> } from './type/with-<%= singular(name) %>.type';

@Resolver(() => With<%= classify(singular(name)) %>)
export class With<%= classify(singular(name)) %>Resolver {
  constructor(
    private readonly loader: <%= classify(singular(name)) %>By<%= classify(singular(name)) %>IdLoader,
  ) {}

  @ResolveField(() => <%= classify(singular(name)) %>, { nullable: true })
  async <%= lowercased(singular(name)) %>(
    @Parent() { <%= lowercased(singular(name)) %>Id, <%= lowercased(singular(name)) %> }: With<%= classify(singular(name)) %>,
  ): Promise<Maybe<<%= classify(singular(name)) %>>> {
    if (<%= lowercased(singular(name)) %>) return <%= lowercased(singular(name)) %>;
    if (<%= lowercased(singular(name)) %>Id) return this.loader.load(<%= lowercased(singular(name)) %>Id);
    return null;
  }
}

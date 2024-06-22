import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { <%= classify(singular(entities)) %> } from './<%= singular(entities) %>.entity';
import { <%= classify(name) %>Loader } from './<%= name %>.loader';
import { <%= classify(name) %> } from './query/<%= name %>.type';

@Resolver(() => <%= classify(name) %>)
export class <%= classify(name) %>Resolver {
  constructor(private readonly loader: <%= classify(name) %>Loader) {}

  @ResolveField(() => [<%= classify(singular(entities)) %>], { nullable: true })
  async <%= lowercased(singular(entities)) %>s(
    @Parent() { id, <%= lowercased(singular(entities)) %>s }: <%= classify(name) %>,
  ): Promise<Maybe<<%= classify(singular(entities)) %>[]>> {
    if (<%= lowercased(singular(entities)) %>s) return <%= lowercased(singular(entities)) %>s;
    return this.loader.load(id);
  }
}

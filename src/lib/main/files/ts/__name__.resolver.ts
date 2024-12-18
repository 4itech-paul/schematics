import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Transactional } from 'typeorm-transactional';

import { <%= classify(singular(name)) %>PageArgs } from './args/<%= singular(name) %>-page.args';
import { <%= classify(singular(name)) %> } from './<%= singular(name) %>.entity';
import { <%= classify(singular(name)) %>Service } from './<%= singular(name) %>.service';
import { Create<%= classify(singular(name)) %>Input } from './input/create-<%= singular(name) %>.input';
import { Remove<%= classify(singular(name)) %>Input } from './input/remove-<%= singular(name) %>.input';
import { Update<%= classify(singular(name)) %>Input } from './input/update-<%= singular(name) %>.input';
import { Create<%= classify(singular(name)) %>Output } from './output/create-<%= singular(name) %>.output';
import { Remove<%= classify(singular(name)) %>Output } from './output/remove-<%= singular(name) %>.output';
import { Update<%= classify(singular(name)) %>Output } from './output/update-<%= singular(name) %>.output';
import { <%= classify(singular(name)) %>PageType } from './type/<%= singular(name) %>-page.type';

@Resolver(() => <%= classify(singular(name)) %>)
export class <%= classify(singular(name)) %>Resolver {
  constructor(private readonly <%= lowercased(singular(name)) %>Service: <%= classify(singular(name)) %>Service) {}

  @Transactional()
  @Mutation(() => Create<%= classify(singular(name)) %>Output)
  async create<%= classify(singular(name)) %>(@Args('input') input: Create<%= classify(singular(name)) %>Input): Promise<Create<%= classify(singular(name)) %>Output> {
    return this.<%= lowercased(singular(name)) %>Service.createOne(input);
  }

  @Transactional()
  @Query(() => <%= classify(singular(name)) %>PageType)
  async <%= lowercased(singular(name)) %>Page(@Args() args: <%= classify(singular(name)) %>PageArgs): Promise<<%= classify(singular(name)) %>PageType> {
    return this.<%= lowercased(singular(name)) %>Service.findByPageArgs(args);
  }

  @Transactional()
  @Query(() => <%= classify(singular(name)) %>, { nullable: true })
  async <%= lowercased(singular(name)) %>(@Args('id', { type: () => ID }) id: string): Promise<Maybe<<%= classify(singular(name)) %>>> {
    return this.<%= lowercased(singular(name)) %>Service.findById(id);
  }

  @Transactional()
  @Mutation(() => Update<%= classify(singular(name)) %>Output)
  async update<%= classify(singular(name)) %>(@Args('input') input: Update<%= classify(singular(name)) %>Input): Promise<Update<%= classify(singular(name)) %>Output> {
    return this.<%= lowercased(singular(name)) %>Service.updateOne(input);
  }

  @Transactional()
  @Mutation(() => Remove<%= classify(singular(name)) %>Output)
  async remove<%= classify(singular(name)) %>(@Args('input') input: Remove<%= classify(singular(name)) %>Input): Promise<Remove<%= classify(singular(name)) %>Output> {
    return this.<%= lowercased(singular(name)) %>Service.removeOne(input.id);
  }
}

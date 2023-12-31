import { User } from '@app/db/entity/user.entity';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { UserDecorator } from '../auth/user.decorator';
import { <%= singular(classify(name)) %>PageArgs } from './args/<%= singular(name) %>-page.args';
import { Create<%= singular(classify(name)) %>Input } from './input/create-<%= singular(name) %>.input';
import { Remove<%= singular(classify(name)) %>Input } from './input/remove-<%= singular(name) %>.input';
import { Update<%= singular(classify(name)) %>Input } from './input/update-<%= singular(name) %>.input';
import { Create<%= singular(classify(name)) %>Output } from './output/create-<%= singular(name) %>.output';
import { Remove<%= singular(classify(name)) %>Output } from './output/remove-<%= singular(name) %>.output';
import { Update<%= singular(classify(name)) %>Output } from './output/update-<%= singular(name) %>.output';
import { <%= singular(classify(name)) %>PageType } from './type/<%= page(singular(name)) %>.type';
import { <%= singular(classify(name)) %> } from './<%= singular(name) %>.entity';
import { <%= singular(classify(name)) %>Service } from './<%= singular(name) %>.service';

@Resolver(() => <%= singular(classify(name)) %>)
export class <%= singular(classify(name)) %>Resolver {
  constructor(
    private readonly <%= singular(lowercased(name)) %>Service: <%= singular(classify(name)) %>Service,
  ) {}

  @Mutation(() => Create<%= singular(classify(name)) %>Output)
  async create<%= singular(classify(name)) %>(
    @Args('input') input: Create<%= singular(classify(name)) %>Input,
    @UserDecorator() user: User,
  ): Promise<Create<%= singular(classify(name)) %>Output> {
    return this.<%= singular(lowercased(name)) %>Service.createOne(input, user);
  }

  @Query(() => <%= singular(classify(name)) %>PageType)
  async <%= lowercased((singular(classify(name)))) %>Page(
    @Args() args: <%= singular(classify(name)) %>PageArgs,
  ): Promise<<%= singular(classify(name)) %>PageType> {
    return this.<%= singular(lowercased(name)) %>Service.findByPageArgs(args);
  }

  @Query(() => <%= singular(classify(name)) %>)
  async <%= lowercased(singular(classify(name))) %>(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Maybe<<%= singular(classify(name)) %>>> {
    return this.<%= singular(lowercased(name)) %>Service.findById(id);
  }

  @Mutation(() => Update<%= singular(classify(name)) %>Output)
  async update<%= singular(classify(name)) %>(
    @Args('input') input: Update<%= singular(classify(name)) %>Input,
    @UserDecorator() user: User,
  ): Promise<Update<%= singular(classify(name)) %>Output> {
    return this.<%= singular(lowercased(name)) %>Service.updateOne(input.id, input, user);
  }

  @Mutation(() => Remove<%= singular(classify(name)) %>Output)
  async remove<%= singular(classify(name)) %>(
    @Args('input') input: Remove<%= singular(classify(name)) %>Input,
  ): Promise<Remove<%= singular(classify(name)) %>Output> {
    return this.<%= singular(lowercased(name)) %>Service.removeOne(input.id);
  }
}

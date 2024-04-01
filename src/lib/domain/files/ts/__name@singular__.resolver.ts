import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { UserDecorator } from 'src/common/user.decorator';
import { User } from 'src/user/user.entity';

import { <%= classify(singular(name)) %> } from './<%= singular(name) %>.entity';
import { <%= classify(singular(name)) %>Service } from './<%= singular(name) %>.service';
import { Create<%= classify(singular(name)) %>Input } from './mutation/create-<%= singular(name) %>.input';
import { Create<%= classify(singular(name)) %>Output } from './mutation/create-<%= singular(name) %>.output';
import { Remove<%= classify(singular(name)) %>Input } from './mutation/remove-<%= singular(name) %>.input';
import { Remove<%= classify(singular(name)) %>Output } from './mutation/remove-<%= singular(name) %>.output';
import { Update<%= classify(singular(name)) %>Input } from './mutation/update-<%= singular(name) %>.input';
import { Update<%= classify(singular(name)) %>Output } from './mutation/update-<%= singular(name) %>.output';
import { <%= classify(singular(name)) %>PageArgs } from './query/<%= singular(name) %>-page.args';
import { <%= classify(singular(name)) %>Page } from './query/<%= singular(name) %>-page.type';

@Resolver(() => <%= classify(singular(name)) %>)
export class <%= classify(singular(name)) %>Resolver {
  constructor(private readonly <%= lowercased(singular(name)) %>Service: <%= classify(singular(name)) %>Service) {}

  @Mutation(() => Create<%= classify(singular(name)) %>Output)
  async create<%= classify(singular(name)) %>(
    @Args('input') input: Create<%= classify(singular(name)) %>Input,
    @UserDecorator() user: User,
  ): Promise<Create<%= classify(singular(name)) %>Output> {
    const <%= lowercased(singular(name)) %> = await this.<%= lowercased(singular(name)) %>Service.saveOne(input, {
      user,
    });
    return { <%= lowercased(singular(name)) %> };
  }

  @Query(() => <%= classify(singular(name)) %>Page)
  <%= lowercased(singular(name)) %>Page(@Args() args: <%= classify(singular(name)) %>PageArgs): Promise<<%= classify(singular(name)) %>Page> {
    return this.<%= lowercased(singular(name)) %>Service.findPage(args);
  }

  @Query(() => <%= classify(singular(name)) %>)
  <%= lowercased(singular(name)) %>(@Args('id', { type: () => ID }) id: string): Promise<Maybe<<%= classify(singular(name)) %>>> {
    return this.<%= lowercased(singular(name)) %>Service.findOne({ where: { id } });
  }

  @Mutation(() => Update<%= classify(singular(name)) %>Output)
  async update<%= classify(singular(name)) %>(
    @Args('input') input: Update<%= classify(singular(name)) %>Input,
    @UserDecorator() user: User,
  ): Promise<Update<%= classify(singular(name)) %>Output> {
    const <%= lowercased(singular(name)) %> = await this.<%= lowercased(singular(name)) %>Service.saveOne(input, {
      user,
    });
    return { <%= lowercased(singular(name)) %> };
  }

  @Mutation(() => Remove<%= classify(singular(name)) %>Output)
  async remove<%= classify(singular(name)) %>(
    @Args('input') input: Remove<%= classify(singular(name)) %>Input,
    @UserDecorator() user: User,
  ): Promise<Remove<%= classify(singular(name)) %>Output> {
    const <%= lowercased(singular(name)) %> = await this.<%= lowercased(singular(name)) %>Service.removeOne(input.id, {
      user,
    });
    return { <%= lowercased(singular(name)) %> };
  }
}

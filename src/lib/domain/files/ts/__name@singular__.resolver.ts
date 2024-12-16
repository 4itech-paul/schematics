import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Transactional } from 'typeorm-transactional';

import { <%= classify(singular(name)) %> } from './<%= singular(name) %>.entity';
import { <%= classify(singular(name)) %>Repository } from './<%= singular(name) %>.repository';
import { <%= classify(singular(name)) %>Service } from './<%= singular(name) %>.service';
import { Create<%= classify(singular(name)) %>Input } from './mutation/create-<%= singular(name) %>.input';
import { Create<%= classify(singular(name)) %>Output } from './mutation/create-<%= singular(name) %>.output';
import { Remove<%= classify(singular(name)) %>Input } from './mutation/remove-<%= singular(name) %>.input';
import { Remove<%= classify(singular(name)) %>Output } from './mutation/remove-<%= singular(name) %>.output';
import { Update<%= classify(singular(name)) %>Input } from './mutation/update-<%= singular(name) %>.input';
import { Update<%= classify(singular(name)) %>Output } from './mutation/update-<%= singular(name) %>.output';
import { <%= classify(singular(name)) %>PageArgs } from './query/<%= singular(name) %>-page.args';
import { <%= classify(singular(name)) %>Page } from './query/<%= singular(name) %>-page.type';
import { <%= classify(singular(name)) %>Args } from './query/<%= singular(name) %>.args';

@Resolver(() => <%= classify(singular(name)) %>)
export class <%= classify(singular(name)) %>Resolver {
  constructor(
    private readonly <%= lowercased(singular(name)) %>Repository: <%= classify(singular(name)) %>Repository,
    private readonly <%= lowercased(singular(name)) %>Service: <%= classify(singular(name)) %>Service,
  ) {}

  @Transactional()
  @Mutation(() => Create<%= classify(singular(name)) %>Output)
  async create<%= classify(singular(name)) %>(
    @Args('input') input: Create<%= classify(singular(name)) %>Input,
  ): Promise<Create<%= classify(singular(name)) %>Output> {
    const <%= lowercased(singular(name)) %> = await this.<%= lowercased(singular(name)) %>Service.saveOne(input);
    return { <%= lowercased(singular(name)) %> };
  }

  @Transactional()
  @Query(() => <%= classify(singular(name)) %>Page)
  <%= lowercased(singular(name)) %>Page(@Args() args: <%= classify(singular(name)) %>PageArgs): Promise<<%= classify(singular(name)) %>Page> {
    return this.<%= lowercased(singular(name)) %>Service.findPage(args);
  }

  @Transactional()
  @Query(() => <%= classify(singular(name)) %>, { nullable: true })
  <%= lowercased(singular(name)) %>(@Args() args: <%= classify(singular(name)) %>Args): Promise<Maybe<<%= classify(singular(name)) %>>> {
    return this.<%= lowercased(singular(name)) %>Repository.findOne({
      where: args.where.map((item) => item?.toFindOptionsWhere()),
    });
  }

  @Transactional()
  @Mutation(() => Update<%= classify(singular(name)) %>Output)
  async update<%= classify(singular(name)) %>(
    @Args('input') input: Update<%= classify(singular(name)) %>Input,
  ): Promise<Update<%= classify(singular(name)) %>Output> {
    const <%= lowercased(singular(name)) %> = await this.<%= lowercased(singular(name)) %>Service.saveOne(input);
    return { <%= lowercased(singular(name)) %> };
  }

  @Transactional()
  @Mutation(() => Remove<%= classify(singular(name)) %>Output)
  async remove<%= classify(singular(name)) %>(
    @Args('input') input: Remove<%= classify(singular(name)) %>Input,
  ): Promise<Remove<%= classify(singular(name)) %>Output> {
    const <%= lowercased(singular(name)) %> = await this.<%= lowercased(singular(name)) %>Service.removeOne(input.id);
    return { <%= lowercased(singular(name)) %> };
  }
}

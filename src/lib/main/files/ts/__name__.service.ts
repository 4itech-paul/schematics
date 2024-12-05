import { DaoIdNotFoundError } from '@app/graphql-type/error/dao-id-not-found.error';
import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import { <%= classify(singular(name)) %>PageArgs } from './args/<%= singular(name) %>-page.args';
import { <%= classify(singular(name)) %> } from './<%= singular(name) %>.entity';
import { <%= classify(singular(name)) %>Repository } from './<%= singular(name) %>.repository';
import { Create<%= classify(singular(name)) %>Input } from './input/create-<%= singular(name) %>.input';
import { Update<%= classify(singular(name)) %>Input } from './input/update-<%= singular(name) %>.input';
import { Create<%= classify(singular(name)) %>Output } from './output/create-<%= singular(name) %>.output';
import { Remove<%= classify(singular(name)) %>Output } from './output/remove-<%= singular(name) %>.output';
import { Update<%= classify(singular(name)) %>Output } from './output/update-<%= singular(name) %>.output';
import { <%= classify(singular(name)) %>PageType } from './type/<%= singular(name) %>-page.type';

@Injectable()
export class <%= classify(singular(name)) %>Service {
  constructor(private readonly repo: <%= classify(singular(name)) %>Repository) {}

  @Transactional()
  async createOne(input: Create<%= classify(singular(name)) %>Input): Promise<Create<%= classify(singular(name)) %>Output> {
    const <%= lowercased(singular(name)) %> = await this.repo.save(input);

    return { <%= lowercased(singular(name)) %> };
  }

  @Transactional()
  async findByPageArgs(args: <%= classify(singular(name)) %>PageArgs): Promise<<%= classify(singular(name)) %>PageType> {
    return this.repo.findNodePage({ ...args, where: args.where.toFindOptionsWhere() });
  }

  @Transactional()
  async findById(id: string): Promise<<%= classify(singular(name)) %> | null> {
    return this.repo.findOneBy({ id });
  }

  @Transactional()
  async updateOne(input: Update<%= classify(singular(name)) %>Input): Promise<Update<%= classify(singular(name)) %>Output> {
    const <%= lowercased(singular(name)) %> = await this.repo.preload({
      ...input,
    });
    if (!<%= lowercased(singular(name)) %>) {
      throw new DaoIdNotFoundError(<%= classify(singular(name)) %>, input.id);
    }

    await this.repo.save(<%= lowercased(singular(name)) %>);

    return {
      <%= lowercased(singular(name)) %>,
    };
  }

  @Transactional()
  async removeOne(id: string): Promise<Remove<%= classify(singular(name)) %>Output> {
    const <%= lowercased(singular(name)) %> = await this.repo.findOneByOrFail({ id });

    await this.repo.softRemove(<%= lowercased(singular(name)) %>);

    return {
      <%= lowercased(singular(name)) %>,
    };
  }
}

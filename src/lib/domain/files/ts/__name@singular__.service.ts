import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { ServiceOptions } from 'src/common/service-options.interface';
import { EntityManager, Repository } from 'typeorm';

import { <%= classify(singular(name)) %> } from './<%= singular(name) %>.entity';
import { Create<%= classify(singular(name)) %>Input } from './mutation/create-<%= singular(name) %>.input';
import { Update<%= classify(singular(name)) %>Input } from './mutation/update-<%= singular(name) %>.input';
import { <%= classify(singular(name)) %>PageArgs } from './query/<%= singular(name) %>-page.args';

@Injectable()
export class <%= classify(singular(name)) %>Service extends BaseService<<%= classify(singular(name)) %>> {
  constructor(
    @InjectRepository(<%= classify(singular(name)) %>)
    readonly repo: Repository<<%= classify(singular(name)) %>>,
    private readonly manager: EntityManager,
  ) {
    super(repo);
  }

  async saveOne(
    input: Create<%= classify(singular(name)) %>Input | Update<%= classify(singular(name)) %>Input,
    options: ServiceOptions,
  ): Promise<<%= classify(singular(name)) %>> {
    const transaction = async (manager: EntityManager) => {
      const <%= lowercased(singular(name)) %> = await this.save(input, { manager, user: options.user });

      return <%= lowercased(singular(name)) %>;
    };

    return options.manager
      ? transaction(options.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }

  findPage(args: <%= classify(singular(name)) %>PageArgs, options?: ServiceOptions) {
    return this.findNodePage(args, options);
  }

  async removeOne(id: string, options: ServiceOptions) {
    const transaction = async (manager: EntityManager) => {
      const <%= lowercased(singular(name)) %> = await this.findOneByOrFail({ id });

      return this.softRemove(<%= lowercased(singular(name)) %>, { manager, user: options?.user });
    };

    return options.manager
      ? transaction(options.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }
}

import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import { <%= classify(singular(name)) %> } from './<%= singular(name) %>.entity';
import { <%= classify(singular(name)) %>Repository } from './<%= singular(name) %>.repository';
import { Create<%= classify(singular(name)) %>Input } from './mutation/create-<%= singular(name) %>.input';
import { Update<%= classify(singular(name)) %>Input } from './mutation/update-<%= singular(name) %>.input';
import { <%= classify(singular(name)) %>PageArgs } from './query/<%= singular(name) %>-page.args';

@Injectable()
export class <%= classify(singular(name)) %>Service {
  constructor(private readonly repo: <%= classify(singular(name)) %>Repository) {}

  @Transactional()
  async saveOne(
    input: Create<%= classify(singular(name)) %>Input | Update<%= classify(singular(name)) %>Input,
  ): Promise<<%= classify(singular(name)) %>> {
    const <%= lowercased(singular(name)) %> = this.repo.create(input);
    await this.repo.save(<%= lowercased(singular(name)) %>);

    return <%= lowercased(singular(name)) %>;
  }

  @Transactional()
  findPage(args: <%= classify(singular(name)) %>PageArgs) {
    return this.repo.findNodePage({
      ...args,
      where: args.where.map((item) => item.toFindOptionsWhere()),
    });
  }

  @Transactional()
  async removeOne(id: string) {
    const <%= lowercased(singular(name)) %> = await this.repo.findOneByOrFail({ id });

    return this.repo.softRemove(<%= lowercased(singular(name)) %>);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { IServiceMetadata } from 'src/common/interface/service-metadata.interface';
import { NodeIdNotFoundError } from 'src/common/node-id-not-found.error';
import { EntityManager, Repository } from 'typeorm';

import { <%= classify(singular(name)) %> } from './<%= singular(name) %>.entity';
import { Create<%= classify(singular(name)) %>Input } from './mutation/create-<%= singular(name) %>.input';
import { Update<%= classify(singular(name)) %>Input } from './mutation/update-<%= singular(name) %>.input';
import { <%= classify(singular(name)) %>PageArgs } from './query/<%= singular(name) %>-page.args';

@Injectable()
export class <%= classify(singular(name)) %>Service extends BaseService<<%= classify(singular(name)) %>> {
  constructor(
    private readonly manager: EntityManager,
    @InjectRepository(<%= classify(singular(name)) %>)
    readonly <%= lowercased(singular(name)) %>Repo: Repository<<%= classify(singular(name)) %>>,
  ) {
    super(<%= lowercased(singular(name)) %>Repo);
  }

  async createOne(
    input: Create<%= classify(singular(name)) %>Input | <%= classify(singular(name)) %>,
    metadata?: IServiceMetadata,
  ): Promise<<%= classify(singular(name)) %>> {
    const create = async (manager: EntityManager) => {
      const dao = input instanceof <%= classify(singular(name)) %> ? input : this.create(input);
      if (metadata?.user) {
        dao.createUserId = metadata.user.id;
        dao.updateUserId = metadata.user.id;
      }
      return this.save(dao, { manager });
    };

    if (metadata?.manager) {
      return create(metadata.manager);
    }

    return this.manager.transaction('READ COMMITTED', create);
  }

  findPage(args: <%= classify(singular(name)) %>PageArgs, metadata?: IServiceMetadata) {
    return this.findNodePage(args, metadata);
  }

  async updateOne(
    input: Update<%= classify(singular(name)) %>Input,
    metadata: IServiceMetadata,
  ): Promise<<%= classify(singular(name)) %>> {
    const update = async (manager: EntityManager) => {
      const <%= lowercased(singular(name)) %>Repo = manager.getRepository(<%= classify(singular(name)) %>);
      const exist<%= classify(singular(name)) %> = await <%= lowercased(singular(name)) %>Repo.findOne({
        where: { id: input.id },
      });
      if (!exist<%= classify(singular(name)) %>) {
        throw new NodeIdNotFoundError(<%= classify(singular(name)) %>, input.id);
      }

      return this.save(
        {
          ...exist<%= classify(singular(name)) %>,
          ...input,
          updateUserId: metadata?.user?.id,
        },
        { manager },
      );
    };

    if (metadata?.manager) {
      return update(metadata.manager);
    }

    return this.manager.transaction('READ COMMITTED', update);
  }

  async removeOne(id: string, metadata: IServiceMetadata): Promise<<%= classify(singular(name)) %>> {
    const remove = async (manager: EntityManager) => {
      const <%= lowercased(singular(name)) %>Repo = manager.getRepository(<%= classify(singular(name)) %>);

      const <%= lowercased(singular(name)) %> = await <%= lowercased(singular(name)) %>Repo.findOneBy({ id });
      if (!<%= lowercased(singular(name)) %>) {
        throw new NodeIdNotFoundError(<%= classify(singular(name)) %>, id);
      }

      return <%= lowercased(singular(name)) %>Repo.softRemove(<%= lowercased(singular(name)) %>);
    };

    if (metadata?.manager) {
      return remove(metadata.manager);
    }

    return this.manager.transaction('READ COMMITTED', remove);
  }
}

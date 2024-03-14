import { DaoIdNotFoundError } from '@app/graphql-type/error/dao-id-not-found.error';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'apps/main/src/common/base.service';
import { EntityManager, Repository } from 'typeorm';

import { ServiceMetadata } from '../common/service-metadata.interface';
import { User } from '../user/user.entity';
import { <%= classify(singular(name)) %>PageArgs } from './args/<%= singular(name) %>-page.args';
import { <%= classify(singular(name)) %> } from './<%= singular(name) %>.entity';
import { Create<%= classify(singular(name)) %>Input } from './input/create-<%= singular(name) %>.input';
import { Update<%= classify(singular(name)) %>Input } from './input/update-<%= singular(name) %>.input';
import { Create<%= classify(singular(name)) %>Output } from './output/create-<%= singular(name) %>.output';
import { Remove<%= classify(singular(name)) %>Output } from './output/remove-<%= singular(name) %>.output';
import { Update<%= classify(singular(name)) %>Output } from './output/update-<%= singular(name) %>.output';
import { <%= classify(singular(name)) %>PageType } from './type/<%= singular(name) %>-page.type';

@Injectable()
export class <%= classify(singular(name)) %>Service extends BaseService<<%= classify(singular(name)) %>> {
  constructor(
    private readonly manager: EntityManager,
    @InjectRepository(<%= classify(singular(name)) %>)
    private readonly <%= lowercased(singular(name)) %>Repo: Repository<<%= classify(singular(name)) %>>,
  ) {
    super(<%= lowercased(singular(name)) %>Repo);
  }

  async createOne(
    input: Create<%= classify(singular(name)) %>Input,
    user: User,
    metadata?: Pick<ServiceMetadata, 'manager'>,
  ): Promise<Create<%= classify(singular(name)) %>Output> {
    const transaction = async (manager: EntityManager) => {
      const <%= lowercased(singular(name)) %> = await this.save(
        {
          ...input,
          createdBy: user.id,
          updatedBy: user.id,
        },
        { manager },
      );

      return { <%= lowercased(singular(name)) %> };
    };

    return metadata?.manager
      ? transaction(metadata.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }

  async findByPageArgs(
    args: <%= classify(singular(name)) %>PageArgs,
    metadata?: Pick<ServiceMetadata, 'manager'>,
  ): Promise<<%= classify(singular(name)) %>PageType> {
    return this.findNodePage(
      { ...args, where: args.where.toFindOptionsWhere() },
      metadata,
    );
  }

  async findById(
    id: string,
    metadata?: Pick<ServiceMetadata, 'manager'>,
  ): Promise<<%= classify(singular(name)) %> | null> {
    if (metadata?.manager) {
      const <%= lowercased(singular(name)) %>Repo = metadata.manager.getRepository(<%= classify(singular(name)) %>);
      return <%= lowercased(singular(name)) %>Repo.findOneBy({ id });
    }

    return this.<%= lowercased(singular(name)) %>Repo.findOneBy({ id });
  }

  async updateOne(
    id: string,
    input: Update<%= classify(singular(name)) %>Input,
    user: User,
    metadata?: Pick<ServiceMetadata, 'manager'>,
  ): Promise<Update<%= classify(singular(name)) %>Output> {
    const transaction = async (manager: EntityManager) => {
      const <%= lowercased(singular(name)) %>Repo = manager.getRepository(<%= classify(singular(name)) %>);

      const <%= lowercased(singular(name)) %> = await <%= lowercased(singular(name)) %>Repo.preload({
        ...input,
        updatedBy: user.id,
        id,
      });
      if (!<%= lowercased(singular(name)) %>) {
        throw new DaoIdNotFoundError(<%= classify(singular(name)) %>, id);
      }

      await <%= lowercased(singular(name)) %>Repo.save(<%= lowercased(singular(name)) %>);

      return {
        <%= lowercased(singular(name)) %>,
      };
    };

    return metadata?.manager
      ? transaction(metadata.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }

  async removeOne(
    id: string,
    metadata?: Pick<ServiceMetadata, 'manager'>,
  ): Promise<Remove<%= classify(singular(name)) %>Output> {
    const transaction = async (manager: EntityManager) => {
      const <%= lowercased(singular(name)) %> = await this.findOneByOrFail({ id }, { manager });

      await this.softRemove(<%= lowercased(singular(name)) %>, { manager });

      return {
        <%= lowercased(singular(name)) %>,
      };
    };

    return metadata?.manager
      ? transaction(metadata.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }
}

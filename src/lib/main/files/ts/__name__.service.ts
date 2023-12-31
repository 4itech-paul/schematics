import { <%= singular(classify(name)) %> } from '@app/db/entity/<%= singular(name) %>.entity';
import { DaoIdNotFoundError } from '@app/graphql-type/error/dao-id-not-found.error';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService, Nullable } from 'apps/main/src/common/base.service';
import { Maybe } from 'graphql/jsutils/Maybe';
import { EntityManager, FindOptionsWhere, Repository } from 'typeorm';

import { ServiceMetadata } from '../common/service-metadata.interface';
import { <%= singular(classify(name)) %>PageArgs } from './args/<%= singular(name) %>-page.args';
import { Create<%= singular(classify(name)) %>Input } from './input/create-<%= singular(name) %>.input';
import { Update<%= singular(classify(name)) %>Input } from './input/update-<%= singular(name) %>.input';
import { <%= singular(classify(name)) %>WhereInput } from './input/<%= singular(lowercased(name)) %>-where.input';
import { Create<%= singular(classify(name)) %>Output } from './output/create-<%= singular(name) %>.output';
import { Remove<%= singular(classify(name)) %>Output } from './output/remove-<%= singular(name) %>.output';
import { Update<%= singular(classify(name)) %>Output } from './output/update-<%= singular(name) %>.output';
import { <%= singular(classify(name)) %>PageType } from './type/<%= singular(name) %>-page.type';

@Injectable()
export class <%= singular(classify(name)) %>Service extends BaseService<<%= singular(classify(name)) %>> {
  constructor(
    private readonly manager: EntityManager,
    @InjectRepository(<%= singular(classify(name)) %>)
    private readonly <%= singular(lowercased(name)) %>Repo: Repository<<%= singular(classify(name)) %>>,
  ) {
    super(<%= singular(lowercased(name)) %>Repo);
  }

  async createOne(
    input: Create<%= singular(classify(name)) %>Input,
    user: User,
    metadata?: Pick<ServiceMetadata, 'manager'>,
  ): Promise<Create<%= singular(classify(name)) %>Output> {
    const create = async (manager: EntityManager) => {
      const <%= singular(lowercased(name)) %>Repo = manager.getRepository(<%= singular(classify(name)) %>);

      const <%= singular(lowercased(name)) %> = <%= singular(lowercased(name)) %>Repo.create({
        ...input,
        createdBy: user.id,
        updatedBy: user.id,
      });

      await <%= singular(lowercased(name)) %>Repo.save(
        <%= singular(lowercased(name)) %>,
      );

      return { <%= singular(lowercased(name)) %> };
    };

    if (metadata?.manager) {
      return create(metadata.manager);
    }

    return this.manager.transaction('READ COMMITTED', create);
  }

  async findByPageArgs(
    args: <%= singular(classify(name)) %>PageArgs,
    metadata?: Pick<ServiceMetadata, 'manager'>,
  ): Promise<<%= singular(classify(name)) %>PageType> {
    return this.findNodePage(
      { ...args, where: args.where.toFindOptionsWhere() },
      metadata,
    );
  }

  async findById(
    id: string,
    metadata?: Pick<ServiceMetadata, 'manager'>,
  ): Promise<<%= singular(classify(name)) %> | null> {
    if (metadata?.manager) {
      const <%= singular(lowercased(name)) %>Repo = metadata.manager.getRepository(<%= singular(classify(name)) %>);
      return <%= singular(lowercased(name)) %>Repo.findOneBy({ id });
    }

    return this.<%= singular(lowercased(name)) %>Repo.findOneBy({ id });
  }

  async updateOne(
    id: string,
    input: Update<%= singular(classify(name)) %>Input,
    user: User,
    metadata?: Pick<ServiceMetadata, 'manager'>,
  ): Promise<Update<%= singular(classify(name)) %>Output> {
    const update = async (manager: EntityManager) => {
      const <%= singular(lowercased(name)) %>Repo = manager.getRepository(<%= singular(classify(name)) %>);

      const <%= singular(lowercased(name)) %> = await <%= singular(lowercased(name)) %>Repo.preload({
        ...input,
        updatedBy: user.id,
        id,
      });
      if (!<%= singular(lowercased(name)) %>) {
        throw new DaoIdNotFoundError(<%= singular(classify(name)) %>, id);
      }

      await <%= singular(lowercased(name)) %>Repo.save(
        <%= singular(lowercased(name)) %>,
      );

      return {
        <%= singular(lowercased(name)) %>,
      };
    };

    if (metadata?.manager) {
      return update(metadata.manager);
    }

    return this.manager.transaction('READ COMMITTED', update);
  }

  async removeOne(
    id: string,
    metadata?: Pick<ServiceMetadata, 'manager'>,
  ): Promise<Remove<%= singular(classify(name)) %>Output> {
    const remove = async (manager: EntityManager) => {
      const <%= singular(lowercased(name)) %>Repo = manager.getRepository(<%= singular(classify(name)) %>);

      const <%= singular(lowercased(name)) %> = await <%= singular(lowercased(name)) %>Repo.findOneBy({ id });
      if (!<%= singular(lowercased(name)) %>) {
        throw new DaoIdNotFoundError(<%= singular(classify(name)) %>, id);
      }

      await <%= singular(lowercased(name)) %>Repo.softRemove(<%= singular(lowercased(name)) %>);

      return {
        <%= singular(lowercased(name)) %>,
      };
    };

    if (metadata?.manager) {
      return remove(metadata.manager);
    }

    return this.manager.transaction('READ COMMITTED', remove);
  }
}

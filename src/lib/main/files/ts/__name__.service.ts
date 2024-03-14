import { DaoIdNotFoundError } from '@app/graphql-type/error/dao-id-not-found.error';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'apps/main/src/common/base.service';
import { EntityManager, Repository } from 'typeorm';

import { ServiceMetadata } from '../common/service-metadata.interface';
import { User } from '../user/user.entity';
import { Domain1PageArgs } from './args/<%= singular(name) %>-page.args';
import { <%= classify(singular(name)) %> } from './<%= singular(name) %>.entity';
import { CreateDomain1Input } from './input/create-<%= singular(name) %>.input';
import { UpdateDomain1Input } from './input/update-<%= singular(name) %>.input';
import { CreateDomain1Output } from './output/create-<%= singular(name) %>.output';
import { RemoveDomain1Output } from './output/remove-<%= singular(name) %>.output';
import { UpdateDomain1Output } from './output/update-<%= singular(name) %>.output';
import { Domain1PageType } from './type/<%= singular(name) %>-page.type';

@Injectable()
export class <%= classify(singular(name)) %>Service extends BaseService<<%= classify(singular(name)) %>> {
  constructor(
    private readonly manager: EntityManager,
    @InjectRepository(<%= classify(singular(name)) %>)
    private readonly domain1Repo: Repository<<%= classify(singular(name)) %>>,
  ) {
    super(<%= lowercased(singular(name)) %>Repo);
  }

  async createOne(
    input: CreateDomain1Input,
    user: User,
    metadata?: Pick<ServiceMetadata, 'manager'>,
  ): Promise<CreateDomain1Output> {
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
    args: Domain1PageArgs,
    metadata?: Pick<ServiceMetadata, 'manager'>,
  ): Promise<Domain1PageType> {
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
      const domain1Repo = metadata.manager.getRepository(<%= classify(singular(name)) %>);
      return domain1Repo.findOneBy({ id });
    }

    return this.domain1Repo.findOneBy({ id });
  }

  async updateOne(
    id: string,
    input: UpdateDomain1Input,
    user: User,
    metadata?: Pick<ServiceMetadata, 'manager'>,
  ): Promise<UpdateDomain1Output> {
    const transaction = async (manager: EntityManager) => {
      const domain1Repo = manager.getRepository(<%= classify(singular(name)) %>);

      const <%= lowercased(singular(name)) %> = await domain1Repo.preload({
        ...input,
        updatedBy: user.id,
        id,
      });
      if (!<%= lowercased(singular(name)) %>) {
        throw new DaoIdNotFoundError(<%= classify(singular(name)) %>, id);
      }

      await domain1Repo.save(<%= lowercased(singular(name)) %>);

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
  ): Promise<RemoveDomain1Output> {
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

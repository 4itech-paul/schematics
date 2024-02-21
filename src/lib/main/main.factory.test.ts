import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { MainOptions } from './main.schema';

describe('main Factory', () => {
  const runner: SchematicTestRunner = new SchematicTestRunner(
    '.',
    path.join(process.cwd(), 'src/collection.json'),
  );

  describe('[GraphQL - Code first]', () => {
    it('should generate appropriate files ', async () => {
      const options: MainOptions = {
        name: 'domain-1',
        crud: true,
        type: 'graphql-code-first',
      };
      const tree = await runner.runSchematic('main', options);
      const files = tree.files;
      expect(files).toEqual([
        '/domain-1/domain-1.entity.ts',
        '/domain-1/domain-1-by-domain-1-id.loader.ts',
        '/domain-1/domain-1.module.ts',
        '/domain-1/domain-1.resolver.spec.ts',
        '/domain-1/domain-1.resolver.ts',
        '/domain-1/domain-1.service.spec.ts',
        '/domain-1/domain-1.service.ts',
        '/domain-1/with-domain-1.resolver.ts',
        '/domain-1/args/domain-1-page.args.ts',
        '/domain-1/input/domain-1-order.input.ts',
        '/domain-1/input/domain-1-where.input.ts',
        '/domain-1/input/create-domain-1.input.ts',
        '/domain-1/input/remove-domain-1.input.ts',
        '/domain-1/input/update-domain-1.input.ts',
        '/domain-1/output/create-domain-1.output.ts',
        '/domain-1/output/remove-domain-1.output.ts',
        '/domain-1/output/update-domain-1.output.ts',
        '/domain-1/type/domain-1-page.type.ts',
        '/domain-1/type/with-domain-1.type.ts',
      ]);
    });
    describe('when "crud" option is not enabled', () => {
      it('should generate appropriate files (without dtos)', async () => {
        const options: MainOptions = {
          name: 'domain-1',
          crud: false,
          type: 'graphql-code-first',
        };
        const tree = await runner.runSchematic('main', options);
        const files = tree.files;
        expect(files).toEqual([
          '/domain-1/domain-1.entity.ts',
          '/domain-1/domain-1-by-domain-1-id.loader.ts',
          '/domain-1/domain-1.module.ts',
          '/domain-1/domain-1.resolver.spec.ts',
          '/domain-1/domain-1.resolver.ts',
          '/domain-1/domain-1.service.spec.ts',
          '/domain-1/domain-1.service.ts',
          '/domain-1/with-domain-1.resolver.ts',
          '/domain-1/args/domain-1-page.args.ts',
          '/domain-1/output/create-domain-1.output.ts',
          '/domain-1/output/remove-domain-1.output.ts',
          '/domain-1/output/update-domain-1.output.ts',
        ]);
      });
    });
    describe('when "spec" option is not enabled', () => {
      it('should generate appropriate files (without dtos)', async () => {
        const options: MainOptions = {
          name: 'domain-1',
          spec: false,
          crud: false,
          type: 'graphql-code-first',
        };
        const tree = await runner.runSchematic('main', options);
        const files = tree.files;
        expect(files).toEqual([
          '/domain-1/domain-1.entity.ts',
          '/domain-1/domain-1-by-domain-1-id.loader.ts',
          '/domain-1/domain-1.module.ts',
          '/domain-1/domain-1.resolver.ts',
          '/domain-1/domain-1.service.ts',
          '/domain-1/with-domain-1.resolver.ts',
          '/domain-1/args/domain-1-page.args.ts',
          '/domain-1/output/create-domain-1.output.ts',
          '/domain-1/output/remove-domain-1.output.ts',
          '/domain-1/output/update-domain-1.output.ts',
        ]);
      });
    });
  });
  describe('[GraphQL - Code first]', () => {
    const options: MainOptions = {
      name: 'domain-1',
      crud: true,
      type: 'graphql-code-first',
    };

    let tree: UnitTestTree;

    beforeAll(async () => {
      tree = await runner.runSchematic('main', options);
    });

    it('should generate "domain-1-page.args" class', () => {
      expect(tree.readContent('/domain-1/args/domain-1-page.args.ts'))
        .toEqual(`import { DaoNodePageArgs } from '@app/graphql-type/args/dao-node-page.args';
import { TypeField } from '@app/util/type-field.decorator';
import { ArgsType } from '@nestjs/graphql';

import { Domain1OrderInput } from '../input/domain-1-order.input';
import { Domain1WhereInput } from '../input/domain-1-where.input';

@ArgsType()
export class Domain1PageArgs extends DaoNodePageArgs {
  @TypeField(() => Domain1OrderInput, {
    description: '排序欄位與方式',
    defaultValue: new Domain1OrderInput(),
  })
  order: Domain1OrderInput = new Domain1OrderInput();

  @TypeField(() => Domain1WhereInput, {
    description: '查詢條件',
    defaultValue: new Domain1WhereInput(),
  })
  where: Domain1WhereInput = new Domain1WhereInput();
}
`);
    });

    it('should generate "create-domain-1.input" class', () => {
      expect(tree.readContent('/domain-1/input/create-domain-1.input.ts'))
        .toEqual(`import { ToCreateInputType } from '@app/graphql-type/to-create-input-type';
import { InputType } from '@nestjs/graphql';

import { Domain1 } from '../domain-1.entity';

@InputType()
export class CreateDomain1Input extends ToCreateInputType(Domain1) {}
`);
    });

    it('should generate "domain-1-order.input" class', () => {
      expect(tree.readContent('/domain-1/input/domain-1-order.input.ts'))
        .toEqual(`import { ToOrderInputType } from '@app/graphql-type/to-order-input-type';
import { InputType } from '@nestjs/graphql';

import { Domain1 } from '../domain-1.entity';

@InputType()
export class Domain1OrderInput extends ToOrderInputType(Domain1) {}
`);
    });

    it('should generate "domain-1-where.input" class', () => {
      expect(tree.readContent('/domain-1/input/domain-1-where.input.ts'))
        .toEqual(`import { ToWhereInputType } from '@app/graphql-type/to-where-input-type';
import { InputType } from '@nestjs/graphql';
import { Nullable } from 'apps/main/src/common/base.service';
import { FindOptionsWhere } from 'typeorm';

import { Domain1 } from '../domain-1.entity';

@InputType()
export class Domain1WhereInput extends ToWhereInputType(Domain1) {
  toFindOptionsWhere(): Nullable<FindOptionsWhere<Domain1>> | undefined {
    const { ...where } = this;

    return { ...where };
  }
}
`);
    });

    it('should generate "remove-domain-1.input" class', () => {
      expect(tree.readContent('/domain-1/input/remove-domain-1.input.ts'))
        .toEqual(`import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveDomain1Input {
  @Field(() => ID)
  id!: string;
}
`);
    });

    it('should generate "update-domain-1.input" class', () => {
      expect(tree.readContent('/domain-1/input/update-domain-1.input.ts'))
        .toEqual(`import { Field, ID, InputType, PartialType } from '@nestjs/graphql';

import { CreateDomain1Input } from './create-domain-1.input';

@InputType()
export class UpdateDomain1Input extends PartialType(
  CreateDomain1Input,
) {
  @Field(() => ID)
  id!: string;
}
`);
    });

    it('should generate "create-domain-1.output" class', () => {
      expect(tree.readContent('/domain-1/output/create-domain-1.output.ts'))
        .toEqual(`import { Field, ObjectType } from '@nestjs/graphql';

import { Domain1 } from '../domain-1.entity';

@ObjectType()
export class CreateDomain1Output {
  @Field(() => Domain1)
  domain1!: Domain1;
}
`);
    });

    it('should generate "remove-domain-1.output" class', () => {
      expect(tree.readContent('/domain-1/output/remove-domain-1.output.ts'))
        .toEqual(`import { Field, ObjectType } from '@nestjs/graphql';

import { Domain1 } from '../domain-1.entity';

@ObjectType()
export class RemoveDomain1Output {
  @Field(() => Domain1)
  domain1!: Domain1;
}
`);
    });

    it('should generate "update-domain-1.output" class', () => {
      expect(tree.readContent('/domain-1/output/update-domain-1.output.ts'))
        .toEqual(`import { Field, ObjectType } from '@nestjs/graphql';

import { Domain1 } from '../domain-1.entity';

@ObjectType()
export class UpdateDomain1Output {
  @Field(() => Domain1)
  domain1!: Domain1;
}
`);
    });

    it('should generate "domain-1-page.type" class', () => {
      expect(tree.readContent('/domain-1/type/domain-1-page.type.ts'))
        .toEqual(`import { Field, ObjectType } from '@nestjs/graphql';
import { MainDaoNodePage } from 'apps/main/src/common/main-dao-node-page.type';

import { Domain1 } from '../domain-1.entity';

@ObjectType('Domain1Page', {
  implements: [MainDaoNodePage],
})
export class Domain1PageType implements MainDaoNodePage<Domain1> {
  @Field(() => [Domain1], { description: 'Nodes in this page' })
  nodes!: Domain1[];
}
`);
    });

    it('should generate "with-domain-1.type" class', () => {
      expect(tree.readContent('/domain-1/type/with-domain-1.type.ts'))
        .toEqual(`import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain1 } from '../domain-1.entity';

@InterfaceType()
export abstract class WithDomain1 {
  @Field(() => ID, { nullable: true })
  domain1Id?: Maybe<string>;

  @Field(() => Domain1, { nullable: true })
  domain1?: Maybe<Domain1>;
}
`);
    });

    it('should generate "domain-1-by-domain-1-id.loader" class', () => {
      expect(tree.readContent('/domain-1/domain-1-by-domain-1-id.loader.ts'))
        .toEqual(`// user-loader.service.ts
import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { Maybe } from 'graphql/jsutils/Maybe';
import { In, Repository } from 'typeorm';

import { Domain1 } from './domain-1.entity';

@Injectable({ scope: Scope.REQUEST })
export class Domain1ByDomain1IdLoader extends DataLoader<
  string,
  Maybe<Domain1>
> {
  constructor(
    @InjectRepository(Domain1)
    private readonly repo: Repository<Domain1>,
  ) {
    super(async (keys: readonly string[]): Promise<Maybe<Domain1>[]> => {
      const daos = await this.repo.find({
        where: {
          id: In(keys),
        },
      });
      const daoMap = new Map(daos.map((dao) => [dao.id, dao]));
      return keys.map((key) => daoMap.get(key));
    });
  }
}
`);
    });

    it('should generate "domain-1.entity" class', () => {
      expect(tree.readContent('/domain-1/domain-1.entity.ts'))
        .toEqual(`import { CustomBaseEntity } from '@app/db/entity/custom-base.entity';
import { VarcharLength } from '@app/enum/varchar-length.enum';
import { ColumnField } from '@app/util/column-field.decorator';
import { ObjectType } from '@nestjs/graphql';
import { MainDaoNode } from 'apps/main/src/common/main-dao-node.type';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Entity } from 'typeorm';

@ObjectType({ implements: [MainDaoNode] })
@Entity()
export class Domain1 extends CustomBaseEntity {
  @ColumnField({
    type: 'varchar',
    length: VarcharLength.Short,
    comment: '#',
    nullable: true,
  })
  exampleField?: Maybe<string>;
}
`);
    });

    it('should generate "domain-1.module" class', () => {
      expect(tree.readContent('/domain-1/domain-1.module.ts'))
        .toEqual(`import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Domain1 } from './domain-1.entity';
import { Domain1Resolver } from './domain-1.resolver';
import { Domain1Service } from './domain-1.service';

@Module({
  imports: [TypeOrmModule.forFeature([Domain1])],
  providers: [
    Domain1Resolver,
    Domain1Service,
    Domain1ByDomain1IdLoader,
    WithDomain1Resolver,
  ],
})
export class Domain1Module {}
`);
    });

    it('should generate "domain-1.resolver" class', () => {
      expect(tree.readContent('/domain-1/domain-1.resolver.ts'))
        .toEqual(`import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { UserDecorator } from '../auth/user.decorator';
import { User } from '../user/user.entity';
import { Domain1PageArgs } from './args/domain-1-page.args';
import { CreateDomain1Input } from './input/create-domain-1.input';
import { RemoveDomain1Input } from './input/remove-domain-1.input';
import { UpdateDomain1Input } from './input/update-domain-1.input';
import { CreateDomain1Output } from './output/create-domain-1.output';
import { RemoveDomain1Output } from './output/remove-domain-1.output';
import { UpdateDomain1Output } from './output/update-domain-1.output';
import { Domain1PageType } from './type/domain-1-page.type';
import { Domain1 } from './domain-1.entity';
import { Domain1Service } from './domain-1.service';

@Resolver(() => Domain1)
export class Domain1Resolver {
  constructor(
    private readonly domain1Service: Domain1Service,
  ) {}

  @Mutation(() => CreateDomain1Output)
  async createDomain1(
    @Args('input') input: CreateDomain1Input,
    @UserDecorator() user: User,
  ): Promise<CreateDomain1Output> {
    return this.domain1Service.createOne(input, user);
  }

  @Query(() => Domain1PageType)
  async domain1Page(
    @Args() args: Domain1PageArgs,
  ): Promise<Domain1PageType> {
    return this.domain1Service.findByPageArgs(args);
  }

  @Query(() => Domain1)
  async domain1(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Maybe<Domain1>> {
    return this.domain1Service.findById(id);
  }

  @Mutation(() => UpdateDomain1Output)
  async updateDomain1(
    @Args('input') input: UpdateDomain1Input,
    @UserDecorator() user: User,
  ): Promise<UpdateDomain1Output> {
    return this.domain1Service.updateOne(input.id, input, user);
  }

  @Mutation(() => RemoveDomain1Output)
  async removeDomain1(
    @Args('input') input: RemoveDomain1Input,
  ): Promise<RemoveDomain1Output> {
    return this.domain1Service.removeOne(input.id);
  }
}
`);
    });

    it('should generate "domain-1.service" class', () => {
      expect(tree.readContent('/domain-1/domain-1.service.ts'))
        .toEqual(`import { DaoIdNotFoundError } from '@app/graphql-type/error/dao-id-not-found.error';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'apps/main/src/common/base.service';
import { EntityManager, Repository } from 'typeorm';

import { ServiceMetadata } from '../common/service-metadata.interface';
import { User } from '../user/user.entity';
import { Domain1PageArgs } from './args/domain-1-page.args';
import { CreateDomain1Input } from './input/create-domain-1.input';
import { UpdateDomain1Input } from './input/update-domain-1.input';
import { CreateDomain1Output } from './output/create-domain-1.output';
import { RemoveDomain1Output } from './output/remove-domain-1.output';
import { UpdateDomain1Output } from './output/update-domain-1.output';
import { Domain1PageType } from './type/domain-1-page.type';
import { Domain1 } from './domain-1.entity';

@Injectable()
export class Domain1Service extends BaseService<Domain1> {
  constructor(
    private readonly manager: EntityManager,
    @InjectRepository(Domain1)
    private readonly domain1Repo: Repository<Domain1>,
  ) {
    super(domain1Repo);
  }

  async createOne(
    input: CreateDomain1Input,
    user: User,
    metadata?: Pick<ServiceMetadata, 'manager'>,
  ): Promise<CreateDomain1Output> {
    const create = async (manager: EntityManager) => {
      const domain1Repo = manager.getRepository(Domain1);

      const domain1 = domain1Repo.create({
        ...input,
        createdBy: user.id,
        updatedBy: user.id,
      });

      await domain1Repo.save(
        domain1,
      );

      return { domain1 };
    };

    if (metadata?.manager) {
      return create(metadata.manager);
    }

    return this.manager.transaction('READ COMMITTED', create);
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
  ): Promise<Domain1 | null> {
    if (metadata?.manager) {
      const domain1Repo = metadata.manager.getRepository(Domain1);
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
    const update = async (manager: EntityManager) => {
      const domain1Repo = manager.getRepository(Domain1);

      const domain1 = await domain1Repo.preload({
        ...input,
        updatedBy: user.id,
        id,
      });
      if (!domain1) {
        throw new DaoIdNotFoundError(Domain1, id);
      }

      await domain1Repo.save(
        domain1,
      );

      return {
        domain1,
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
  ): Promise<RemoveDomain1Output> {
    const remove = async (manager: EntityManager) => {
      const domain1Repo = manager.getRepository(Domain1);

      const domain1 = await domain1Repo.findOneBy({ id });
      if (!domain1) {
        throw new DaoIdNotFoundError(Domain1, id);
      }

      await domain1Repo.softRemove(domain1);

      return {
        domain1,
      };
    };

    if (metadata?.manager) {
      return remove(metadata.manager);
    }

    return this.manager.transaction('READ COMMITTED', remove);
  }
}
`);
    });

    it('should generate "with-domain-1.resolver" class', () => {
      expect(tree.readContent('/domain-1/with-domain-1.resolver.ts'))
        .toEqual(`import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain1ByDomain1IdLoader } from './domain-1-by-domain-1-id.loader';
import { Domain1 } from './domain-1.entity';
import { WithDomain1 } from './type/with-domain-1.type';

@Resolver(() => WithDomain1)
export class WithDomain1Resolver {
  constructor(
    private readonly loader: Domain1ByDomain1IdLoader,
  ) {}

  @ResolveField(() => Domain1, { nullable: true })
  async domain1(
    @Parent() { domain1Id, domain1 }: WithDomain1,
  ): Promise<Maybe<Domain1>> {
    if (domain1) return domain1;
    if (domain1Id) return this.loader.load(domain1Id);
    return null;
  }
}
`);
    });
  });

  it('should create spec files', async () => {
    const options: MainOptions = {
      name: 'foo',
      type: 'rest',
      spec: true,
      flat: true,
    };
    const tree: UnitTestTree = await runner.runSchematic('main', options);
    const files: string[] = tree.files;

    expect(
      files.find((filename) => filename === '/foo.controller.spec.ts'),
    ).toBeDefined();
    expect(
      files.find((filename) => filename === '/foo.service.spec.ts'),
    ).toBeDefined();
  });
  it('should create spec files with custom file suffix', async () => {
    const options: MainOptions = {
      name: 'foo',
      type: 'rest',
      spec: true,
      specFileSuffix: 'test',
      flat: true,
    };
    const tree: UnitTestTree = await runner.runSchematic('main', options);
    const files: string[] = tree.files;

    expect(
      files.find((filename) => filename === '/foo.controller.spec.ts'),
    ).toBeUndefined();
    expect(
      files.find((filename) => filename === '/foo.controller.test.ts'),
    ).toBeDefined();

    expect(
      files.find((filename) => filename === '/foo.service.spec.ts'),
    ).toBeUndefined();
    expect(
      files.find((filename) => filename === '/foo.service.test.ts'),
    ).toBeDefined();
  });
});

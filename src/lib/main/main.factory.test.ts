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
        name: 'domain-0001',
        crud: true,
        type: 'graphql-code-first',
      };
      const tree = await runner.runSchematic('main', options);
      const files = tree.files;
      expect(files).toEqual([
        '/domain-0001/domain-0001.entity.ts',
        '/domain-0001/domain-0001-by-domain-0001-id.loader.ts',
        '/domain-0001/domain-0001.module.ts',
        '/domain-0001/domain-0001.resolver.spec.ts',
        '/domain-0001/domain-0001.resolver.ts',
        '/domain-0001/domain-0001.service.spec.ts',
        '/domain-0001/domain-0001.service.ts',
        '/domain-0001/with-domain-0001.resolver.ts',
        '/domain-0001/args/domain-0001-page.args.ts',
        '/domain-0001/input/domain-0001-order.input.ts',
        '/domain-0001/input/domain-0001-where.input.ts',
        '/domain-0001/input/create-domain-0001.input.ts',
        '/domain-0001/input/remove-domain-0001.input.ts',
        '/domain-0001/input/update-domain-0001.input.ts',
        '/domain-0001/output/create-domain-0001.output.ts',
        '/domain-0001/output/remove-domain-0001.output.ts',
        '/domain-0001/output/update-domain-0001.output.ts',
        '/domain-0001/type/domain-0001-page.type.ts',
        '/domain-0001/type/with-domain-0001.type.ts',
      ]);
    });
    describe('when "crud" option is not enabled', () => {
      it('should generate appropriate files (without dtos)', async () => {
        const options: MainOptions = {
          name: 'domain-0001',
          crud: false,
          type: 'graphql-code-first',
        };
        const tree = await runner.runSchematic('main', options);
        const files = tree.files;
        expect(files).toEqual([
          '/domain-0001/domain-0001.entity.ts',
          '/domain-0001/domain-0001-by-domain-0001-id.loader.ts',
          '/domain-0001/domain-0001.module.ts',
          '/domain-0001/domain-0001.resolver.spec.ts',
          '/domain-0001/domain-0001.resolver.ts',
          '/domain-0001/domain-0001.service.spec.ts',
          '/domain-0001/domain-0001.service.ts',
          '/domain-0001/with-domain-0001.resolver.ts',
          '/domain-0001/args/domain-0001-page.args.ts',
          '/domain-0001/output/create-domain-0001.output.ts',
          '/domain-0001/output/remove-domain-0001.output.ts',
          '/domain-0001/output/update-domain-0001.output.ts',
        ]);
      });
    });
    describe('when "spec" option is not enabled', () => {
      it('should generate appropriate files (without dtos)', async () => {
        const options: MainOptions = {
          name: 'domain-0001',
          spec: false,
          crud: false,
          type: 'graphql-code-first',
        };
        const tree = await runner.runSchematic('main', options);
        const files = tree.files;
        expect(files).toEqual([
          '/domain-0001/domain-0001.entity.ts',
          '/domain-0001/domain-0001-by-domain-0001-id.loader.ts',
          '/domain-0001/domain-0001.module.ts',
          '/domain-0001/domain-0001.resolver.ts',
          '/domain-0001/domain-0001.service.ts',
          '/domain-0001/with-domain-0001.resolver.ts',
          '/domain-0001/args/domain-0001-page.args.ts',
          '/domain-0001/output/create-domain-0001.output.ts',
          '/domain-0001/output/remove-domain-0001.output.ts',
          '/domain-0001/output/update-domain-0001.output.ts',
        ]);
      });
    });
  });
  describe('[GraphQL - Code first]', () => {
    const options: MainOptions = {
      name: 'domain-0001',
      crud: true,
      type: 'graphql-code-first',
    };

    let tree: UnitTestTree;

    beforeAll(async () => {
      tree = await runner.runSchematic('main', options);
    });

    it('should generate "domain-0001-page.args" class', () => {
      expect(tree.readContent('/domain-0001/args/domain-0001-page.args.ts'))
        .toEqual(`import { DaoNodePageArgs } from '@app/graphql-type/args/dao-node-page.args';
import { TypeField } from '@app/util/type-field.decorator';
import { ArgsType } from '@nestjs/graphql';

import { Domain0001OrderInput } from '../input/domain-0001-order.input';
import { Domain0001WhereInput } from '../input/domain-0001-where.input';

@ArgsType()
export class Domain0001PageArgs extends DaoNodePageArgs {
  @TypeField(() => Domain0001OrderInput, {
    description: '排序欄位與方式',
    defaultValue: new Domain0001OrderInput(),
  })
  order: Domain0001OrderInput = new Domain0001OrderInput();

  @TypeField(() => Domain0001WhereInput, {
    description: '查詢條件',
    defaultValue: new Domain0001WhereInput(),
  })
  where: Domain0001WhereInput = new Domain0001WhereInput();
}
`);
    });

    it('should generate "create-domain-0001.input" class', () => {
      expect(tree.readContent('/domain-0001/input/create-domain-0001.input.ts'))
        .toEqual(`import { ToCreateInputType } from '@app/graphql-type/to-create-input-type';
import { InputType, OmitType } from '@nestjs/graphql';

import { Domain0001 } from '../domain-0001.entity';

@InputType()
export class CreateDomain0001Input extends OmitType(
  ToCreateInputType(Domain0001),
  [],
) {}
`);
    });

    it('should generate "domain-0001-order.input" class', () => {
      expect(tree.readContent('/domain-0001/input/domain-0001-order.input.ts'))
        .toEqual(`import { ToOrderInputType } from '@app/graphql-type/to-order-input-type';
import { InputType, OmitType } from '@nestjs/graphql';

import { Domain0001 } from '../domain-0001.entity';

@InputType()
export class Domain0001OrderInput extends OmitType(
  ToOrderInputType(Domain0001),
  [],
) {}
`);
    });

    it('should generate "domain-0001-where.input" class', () => {
      expect(tree.readContent('/domain-0001/input/domain-0001-where.input.ts'))
        .toEqual(`import { ToWhereInputType } from '@app/graphql-type/to-where-input-type';
import { InputType, OmitType } from '@nestjs/graphql';
import { Nullable } from 'apps/main/src/common/base.service';
import { FindOptionsWhere } from 'typeorm';

import { Domain0001 } from '../domain-0001.entity';

@InputType()
export class Domain0001WhereInput extends OmitType(ToWhereInputType(Domain0001), []) {
  toFindOptionsWhere(): Nullable<FindOptionsWhere<Domain0001>> | undefined {
    const { ...where } = this;

    return { ...where };
  }
}
`);
    });

    it('should generate "remove-domain-0001.input" class', () => {
      expect(tree.readContent('/domain-0001/input/remove-domain-0001.input.ts'))
        .toEqual(`import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveDomain0001Input {
  @Field(() => ID)
  id!: string;
}
`);
    });

    it('should generate "update-domain-0001.input" class', () => {
      expect(tree.readContent('/domain-0001/input/update-domain-0001.input.ts'))
        .toEqual(`import { Field, ID, InputType, PartialType } from '@nestjs/graphql';

import { CreateDomain0001Input } from './create-domain-0001.input';

@InputType()
export class UpdateDomain0001Input extends PartialType(
  CreateDomain0001Input,
) {
  @Field(() => ID)
  id!: string;
}
`);
    });

    it('should generate "create-domain-0001.output" class', () => {
      expect(tree.readContent('/domain-0001/output/create-domain-0001.output.ts'))
        .toEqual(`import { Field, ObjectType } from '@nestjs/graphql';

import { Domain0001 } from '../domain-0001.entity';

@ObjectType()
export class CreateDomain0001Output {
  @Field(() => Domain0001)
  domain0001!: Domain0001;
}
`);
    });

    it('should generate "remove-domain-0001.output" class', () => {
      expect(tree.readContent('/domain-0001/output/remove-domain-0001.output.ts'))
        .toEqual(`import { Field, ObjectType } from '@nestjs/graphql';

import { Domain0001 } from '../domain-0001.entity';

@ObjectType()
export class RemoveDomain0001Output {
  @Field(() => Domain0001)
  domain0001!: Domain0001;
}
`);
    });

    it('should generate "update-domain-0001.output" class', () => {
      expect(tree.readContent('/domain-0001/output/update-domain-0001.output.ts'))
        .toEqual(`import { Field, ObjectType } from '@nestjs/graphql';

import { Domain0001 } from '../domain-0001.entity';

@ObjectType()
export class UpdateDomain0001Output {
  @Field(() => Domain0001)
  domain0001!: Domain0001;
}
`);
    });

    it('should generate "domain-0001-page.type" class', () => {
      expect(tree.readContent('/domain-0001/type/domain-0001-page.type.ts'))
        .toEqual(`import { Field, ObjectType } from '@nestjs/graphql';
import { MainDaoNodePage } from 'apps/main/src/common/main-dao-node-page.type';

import { Domain0001 } from '../domain-0001.entity';

@ObjectType('Domain0001Page', {
  implements: [MainDaoNodePage],
})
export class Domain0001PageType implements MainDaoNodePage<Domain0001> {
  @Field(() => [Domain0001], { description: 'Nodes in this page' })
  nodes!: Domain0001[];
}
`);
    });

    it('should generate "with-domain-0001.type" class', () => {
      expect(tree.readContent('/domain-0001/type/with-domain-0001.type.ts'))
        .toEqual(`import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0001 } from '../domain-0001.entity';

@InterfaceType()
export abstract class WithDomain0001 {
  @Field(() => ID, { nullable: true })
  domain0001Id?: Maybe<string>;

  @Field(() => Domain0001, { nullable: true })
  domain0001?: Maybe<Domain0001>;
}
`);
    });

    it('should generate "domain-0001-by-domain-0001-id.loader" class', () => {
      expect(tree.readContent('/domain-0001/domain-0001-by-domain-0001-id.loader.ts'))
        .toEqual(`// user-loader.service.ts
import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { Maybe } from 'graphql/jsutils/Maybe';
import { In, Repository } from 'typeorm';

import { Domain0001 } from './domain-0001.entity';

@Injectable({ scope: Scope.REQUEST })
export class Domain0001ByDomain0001IdLoader extends DataLoader<
  string,
  Maybe<Domain0001>
> {
  constructor(
    @InjectRepository(Domain0001)
    private readonly repo: Repository<Domain0001>,
  ) {
    super(async (keys: readonly string[]): Promise<Maybe<Domain0001>[]> => {
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

    it('should generate "domain-0001.entity" class', () => {
      expect(tree.readContent('/domain-0001/domain-0001.entity.ts'))
        .toEqual(`import { CustomBaseEntity } from '@app/db/entity/custom-base.entity';
import { VarcharLength } from '@app/enum/varchar-length.enum';
import { ColumnField } from '@app/util/column-field.decorator';
import { ObjectType } from '@nestjs/graphql';
import { MainDaoNode } from 'apps/main/src/common/main-dao-node.type';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Entity } from 'typeorm';

@ObjectType({ implements: [MainDaoNode] })
@Entity()
export class Domain0001 extends CustomBaseEntity {
  @ColumnField({
    type: 'varchar',
    length: VarcharLength.Short,
    comment: '',
    nullable: true,
  })
  exampleField?: Maybe<string>;
}
`);
    });

    it('should generate "domain-0001.module" class', () => {
      expect(tree.readContent('/domain-0001/domain-0001.module.ts'))
        .toEqual(`import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Domain0001 } from './domain-0001.entity';
import { Domain0001Resolver } from './domain-0001.resolver';
import { Domain0001Service } from './domain-0001.service';

@Module({
  imports: [TypeOrmModule.forFeature([Domain0001])],
  providers: [
    Domain0001Resolver,
    Domain0001Service,
    // Domain0001ByDomain0001IdLoader,
    // WithDomain0001Resolver,
  ],
})
export class Domain0001Module {}
`);
    });

    it('should generate "domain-0001.resolver" class', () => {
      expect(tree.readContent('/domain-0001/domain-0001.resolver.ts'))
        .toEqual(`import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { UserDecorator } from '../auth/user.decorator';
import { User } from '../user/user.entity';
import { Domain0001PageArgs } from './args/domain-0001-page.args';
import { CreateDomain0001Input } from './input/create-domain-0001.input';
import { RemoveDomain0001Input } from './input/remove-domain-0001.input';
import { UpdateDomain0001Input } from './input/update-domain-0001.input';
import { CreateDomain0001Output } from './output/create-domain-0001.output';
import { RemoveDomain0001Output } from './output/remove-domain-0001.output';
import { UpdateDomain0001Output } from './output/update-domain-0001.output';
import { Domain0001PageType } from './type/domain-0001-page.type';
import { Domain0001 } from './domain-0001.entity';
import { Domain0001Service } from './domain-0001.service';

@Resolver(() => Domain0001)
export class Domain0001Resolver {
  constructor(
    private readonly domain0001Service: Domain0001Service,
  ) {}

  @Mutation(() => CreateDomain0001Output)
  async createDomain0001(
    @Args('input') input: CreateDomain0001Input,
    @UserDecorator() user: User,
  ): Promise<CreateDomain0001Output> {
    return this.domain0001Service.createOne(input, user);
  }

  @Query(() => Domain0001PageType)
  async domain0001Page(
    @Args() args: Domain0001PageArgs,
  ): Promise<Domain0001PageType> {
    return this.domain0001Service.findByPageArgs(args);
  }

  @Query(() => Domain0001)
  async domain0001(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Maybe<Domain0001>> {
    return this.domain0001Service.findById(id);
  }

  @Mutation(() => UpdateDomain0001Output)
  async updateDomain0001(
    @Args('input') input: UpdateDomain0001Input,
    @UserDecorator() user: User,
  ): Promise<UpdateDomain0001Output> {
    return this.domain0001Service.updateOne(input.id, input, user);
  }

  @Mutation(() => RemoveDomain0001Output)
  async removeDomain0001(
    @Args('input') input: RemoveDomain0001Input,
  ): Promise<RemoveDomain0001Output> {
    return this.domain0001Service.removeOne(input.id);
  }
}
`);
    });

    it('should generate "domain-0001.service" class', () => {
      expect(tree.readContent('/domain-0001/domain-0001.service.ts'))
        .toEqual(`import { DaoIdNotFoundError } from '@app/graphql-type/error/dao-id-not-found.error';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'apps/main/src/common/base.service';
import { EntityManager, Repository } from 'typeorm';

import { ServiceMetadata } from '../common/service-metadata.interface';
import { User } from '../user/user.entity';
import { Domain0001PageArgs } from './args/domain-0001-page.args';
import { Domain0001 } from './domain-0001.entity';
import { CreateDomain0001Input } from './input/create-domain-0001.input';
import { UpdateDomain0001Input } from './input/update-domain-0001.input';
import { CreateDomain0001Output } from './output/create-domain-0001.output';
import { RemoveDomain0001Output } from './output/remove-domain-0001.output';
import { UpdateDomain0001Output } from './output/update-domain-0001.output';
import { Domain0001PageType } from './type/domain-0001-page.type';

@Injectable()
export class Domain0001Service extends BaseService<Domain0001> {
  constructor(
    private readonly manager: EntityManager,
    @InjectRepository(Domain0001)
    private readonly domain0001Repo: Repository<Domain0001>,
  ) {
    super(domain0001Repo);
  }

  async createOne(
    input: CreateDomain0001Input,
    user: User,
    metadata?: Pick<ServiceMetadata, 'manager'>,
  ): Promise<CreateDomain0001Output> {
    const transaction = async (manager: EntityManager) => {
      const domain0001 = await this.save(
        {
          ...input,
          createdBy: user.id,
          updatedBy: user.id,
        },
        { manager },
      );

      return { domain0001 };
    };

    return metadata?.manager
      ? transaction(metadata.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }

  async findByPageArgs(
    args: Domain0001PageArgs,
    metadata?: Pick<ServiceMetadata, 'manager'>,
  ): Promise<Domain0001PageType> {
    return this.findNodePage(
      { ...args, where: args.where.toFindOptionsWhere() },
      metadata,
    );
  }

  async findById(
    id: string,
    metadata?: Pick<ServiceMetadata, 'manager'>,
  ): Promise<Domain0001 | null> {
    if (metadata?.manager) {
      const domain0001Repo = metadata.manager.getRepository(Domain0001);
      return domain0001Repo.findOneBy({ id });
    }

    return this.domain0001Repo.findOneBy({ id });
  }

  async updateOne(
    id: string,
    input: UpdateDomain0001Input,
    user: User,
    metadata?: Pick<ServiceMetadata, 'manager'>,
  ): Promise<UpdateDomain0001Output> {
    const transaction = async (manager: EntityManager) => {
      const domain0001Repo = manager.getRepository(Domain0001);

      const domain0001 = await domain0001Repo.preload({
        ...input,
        updatedBy: user.id,
        id,
      });
      if (!domain0001) {
        throw new DaoIdNotFoundError(Domain0001, id);
      }

      await domain0001Repo.save(domain0001);

      return {
        domain0001,
      };
    };

    return metadata?.manager
      ? transaction(metadata.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }

  async removeOne(
    id: string,
    metadata?: Pick<ServiceMetadata, 'manager'>,
  ): Promise<RemoveDomain0001Output> {
    const transaction = async (manager: EntityManager) => {
      const domain0001 = await this.findOneByOrFail({ id }, { manager });

      await this.softRemove(domain0001, { manager });

      return {
        domain0001,
      };
    };

    return metadata?.manager
      ? transaction(metadata.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }
}
`);
    });

    it('should generate "with-domain-0001.resolver" class', () => {
      expect(tree.readContent('/domain-0001/with-domain-0001.resolver.ts'))
        .toEqual(`import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0001ByDomain0001IdLoader } from './domain-0001-by-domain-0001-id.loader';
import { Domain0001 } from './domain-0001.entity';
import { WithDomain0001 } from './type/with-domain-0001.type';

@Resolver(() => WithDomain0001)
export class WithDomain0001Resolver {
  constructor(
    private readonly loader: Domain0001ByDomain0001IdLoader,
  ) {}

  @ResolveField(() => Domain0001, { nullable: true })
  async domain0001(
    @Parent() { domain0001Id, domain0001 }: WithDomain0001,
  ): Promise<Maybe<Domain0001>> {
    if (domain0001) return domain0001;
    if (domain0001Id) return this.loader.load(domain0001Id);
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

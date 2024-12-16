import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { DomainOptions } from './domain.schema';

describe('Domain Factory', () => {
  const runner: SchematicTestRunner = new SchematicTestRunner(
    '.',
    path.join(process.cwd(), 'src/collection.json'),
  );

  describe('[GraphQL - Code first]', () => {
    it('should generate appropriate files ', async () => {
      const options: DomainOptions = {
        name: 'domain-01',
        crud: true,
        type: 'graphql-code-first',
      };
      const tree = await runner.runSchematic('domain', options);
      const files = tree.files;
      expect(files).toEqual([
        '/domain-01/domain-01-by-id.loader.ts',
        '/domain-01/domain-01-by-id.resolver.ts',
        '/domain-01/domain-01.entity.ts',
        '/domain-01/domain-01.module.ts',
        '/domain-01/domain-01.repository.ts',
        '/domain-01/domain-01.resolver.ts',
        '/domain-01/domain-01.service.ts',
        '/domain-01/domain-01.resolver.spec.ts',
        '/domain-01/domain-01.service.spec.ts',
        '/domain-01/mutation/create-domain-01.input.ts',
        '/domain-01/mutation/create-domain-01.output.ts',
        '/domain-01/mutation/remove-domain-01.input.ts',
        '/domain-01/mutation/remove-domain-01.output.ts',
        '/domain-01/mutation/update-domain-01.input.ts',
        '/domain-01/mutation/update-domain-01.output.ts',
        '/domain-01/query/domain-01-by-id.type.ts',
        '/domain-01/query/domain-01-order.input.ts',
        '/domain-01/query/domain-01-page.args.ts',
        '/domain-01/query/domain-01-page.type.ts',
        '/domain-01/query/domain-01-where.input.ts',
        '/domain-01/query/domain-01.args.ts',
      ]);
    });
  });
  describe('[GraphQL - Code first]', () => {
    const options: DomainOptions = {
      name: 'domain-01',
      crud: true,
      type: 'graphql-code-first',
    };

    let tree: UnitTestTree;

    beforeAll(async () => {
      tree = await runner.runSchematic('domain', options);
    });

    it('should generate "Domain01ByIdLoader" class', () => {
      expect(tree.readContent('/domain-01/domain-01-by-id.loader.ts'))
        .toEqual(`import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { Maybe } from 'graphql/jsutils/Maybe';
import { In } from 'typeorm';

import { Domain01 } from './domain-01.entity';
import { Domain01Repository } from './domain-01.repository';

@Injectable({ scope: Scope.REQUEST })
export class Domain01ByIdLoader extends DataLoader<string, Maybe<Domain01>> {
  constructor(private readonly repo: Domain01Repository) {
    super(async (keys: readonly string[]): Promise<Maybe<Domain01>[]> => {
      const daoArray = await this.repo.find({
        where: {
          id: In(keys),
        },
      });
      const daoMap = new Map(daoArray.map((dao) => [dao.id, dao]));
      return keys.map((key) => daoMap.get(key));
    });
  }
}
`);
    });

    it('should generate "Domain01ByIdResolver" class', () => {
      expect(tree.readContent('/domain-01/domain-01-by-id.resolver.ts'))
        .toEqual(`import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain01ByIdLoader } from './domain-01-by-id.loader';
import { Domain01 } from './domain-01.entity';
import { Domain01ById } from './query/domain-01-by-id.type';

@Resolver(() => Domain01ById)
export class Domain01ByIdResolver {
  constructor(private readonly loader: Domain01ByIdLoader) {}

  @ResolveField(() => Domain01, { nullable: true })
  async domain01(
    @Parent() { domain01Id, domain01 }: Domain01ById,
  ): Promise<Maybe<Domain01>> {
    if (domain01) return domain01;
    if (domain01Id) return this.loader.load(domain01Id);
    return null;
  }
}
`);
    });

    it('should generate "Domain01" entity class', () => {
      expect(tree.readContent('/domain-01/domain-01.entity.ts'))
        .toEqual(`import { ObjectType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Entity } from 'typeorm';

import { ColumnField } from '../common/column-field.decorator';
import { MetaEntity } from '../common/meta.entity';

@Entity()
@ObjectType({ implements: [MetaEntity] })
export class Domain01 extends MetaEntity {
  @ColumnField({ type: 'int', nullable: true, comment: 'domain0101' })
  domain0101?: Maybe<number>;
}
`);
    });

    it('should generate "Domain01Module" class', () => {
      expect(tree.readContent('/domain-01/domain-01.module.ts'))
        .toEqual(`import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Domain01 } from './domain-01.entity';
import { Domain01Repository } from './domain-01.repository';
import { Domain01Resolver } from './domain-01.resolver';
import { Domain01Service } from './domain-01.service';

@Module({
  imports: [TypeOrmModule.forFeature([Domain01])],
  providers: [
    Domain01Repository,
    Domain01Service,
    Domain01Resolver,
    // Domain01ByIdLoader,
    // Domain01ByIdResolver,
  ],
})
export class Domain01Module {}
`);
    });

    it('should generate "Domain01Repository" class', () => {
      expect(tree.readContent('/domain-01/domain-01.repository.ts'))
        .toEqual(`import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { BaseRepository } from '../common/base.repository';
import { Domain01 } from './domain-01.entity';

@Injectable()
export class Domain01Repository extends BaseRepository<Domain01> {
  constructor(readonly manager: EntityManager) {
    super(Domain01, manager);
  }
}
`);
    });

    it('should generate "Domain01Resolver" class', () => {
      expect(tree.readContent('/domain-01/domain-01.resolver.ts'))
        .toEqual(`import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Transactional } from 'typeorm-transactional';

import { Domain01 } from './domain-01.entity';
import { Domain01Repository } from './domain-01.repository';
import { Domain01Service } from './domain-01.service';
import { CreateDomain01Input } from './mutation/create-domain-01.input';
import { CreateDomain01Output } from './mutation/create-domain-01.output';
import { RemoveDomain01Input } from './mutation/remove-domain-01.input';
import { RemoveDomain01Output } from './mutation/remove-domain-01.output';
import { UpdateDomain01Input } from './mutation/update-domain-01.input';
import { UpdateDomain01Output } from './mutation/update-domain-01.output';
import { Domain01PageArgs } from './query/domain-01-page.args';
import { Domain01Page } from './query/domain-01-page.type';
import { Domain01Args } from './query/domain-01.args';

@Resolver(() => Domain01)
export class Domain01Resolver {
  constructor(
    private readonly domain01Repository: Domain01Repository,
    private readonly domain01Service: Domain01Service,
  ) {}

  @Transactional()
  @Mutation(() => CreateDomain01Output)
  async createDomain01(
    @Args('input') input: CreateDomain01Input,
  ): Promise<CreateDomain01Output> {
    const domain01 = await this.domain01Service.saveOne(input);
    return { domain01 };
  }

  @Transactional()
  @Query(() => Domain01Page)
  domain01Page(@Args() args: Domain01PageArgs): Promise<Domain01Page> {
    return this.domain01Service.findPage(args);
  }

  @Transactional()
  @Query(() => Domain01, { nullable: true })
  domain01(@Args() args: Domain01Args): Promise<Maybe<Domain01>> {
    return this.domain01Repository.findOne({
      where: args.where.map((item) => item?.toFindOptionsWhere()),
    });
  }

  @Transactional()
  @Mutation(() => UpdateDomain01Output)
  async updateDomain01(
    @Args('input') input: UpdateDomain01Input,
  ): Promise<UpdateDomain01Output> {
    const domain01 = await this.domain01Service.saveOne(input);
    return { domain01 };
  }

  @Transactional()
  @Mutation(() => RemoveDomain01Output)
  async removeDomain01(
    @Args('input') input: RemoveDomain01Input,
  ): Promise<RemoveDomain01Output> {
    const domain01 = await this.domain01Service.removeOne(input.id);
    return { domain01 };
  }
}
`);
    });

    it('should generate "Domain01Service" class', () => {
      expect(tree.readContent('/domain-01/domain-01.service.ts'))
        .toEqual(`import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import { Domain01 } from './domain-01.entity';
import { Domain01Repository } from './domain-01.repository';
import { CreateDomain01Input } from './mutation/create-domain-01.input';
import { UpdateDomain01Input } from './mutation/update-domain-01.input';
import { Domain01PageArgs } from './query/domain-01-page.args';

@Injectable()
export class Domain01Service {
  constructor(private readonly repo: Domain01Repository) {}

  @Transactional()
  async saveOne(
    input: CreateDomain01Input | UpdateDomain01Input,
  ): Promise<Domain01> {
    const domain01 = this.repo.create(input);
    await this.repo.save(domain01);

    return domain01;
  }

  @Transactional()
  findPage(args: Domain01PageArgs) {
    return this.repo.findNodePage({
      ...args,
      where: args.where.map((item) => item.toFindOptionsWhere()),
    });
  }

  @Transactional()
  async removeOne(id: string) {
    const domain01 = await this.repo.findOneByOrFail({ id });

    return this.repo.softRemove(domain01);
  }
}
`);
    });

    it('should generate "CreateDomain01Input" class', () => {
      expect(tree.readContent('/domain-01/mutation/create-domain-01.input.ts'))
        .toEqual(`import { InputType, OmitType } from '@nestjs/graphql';

import { ToCreateInputType } from '../../common/to-create-input-type';
import { Domain01 } from '../domain-01.entity';

@InputType()
export class CreateDomain01Input extends OmitType(
  ToCreateInputType(Domain01),
  [],
) {}
`);
    });

    it('should generate "CreateDomain01Output" class', () => {
      expect(tree.readContent('/domain-01/mutation/create-domain-01.output.ts'))
        .toEqual(`import { Field, ObjectType } from '@nestjs/graphql';

import { Domain01 } from '../domain-01.entity';

@ObjectType()
export class CreateDomain01Output {
  @Field(() => Domain01)
  domain01!: Domain01;
}
`);
    });

    it('should generate "RemoveDomain01Input" class', () => {
      expect(tree.readContent('/domain-01/mutation/remove-domain-01.input.ts'))
        .toEqual(`import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveDomain01Input {
  @Field(() => ID)
  id!: string;
}
`);
    });

    it('should generate "RemoveDomain01Output" class', () => {
      expect(tree.readContent('/domain-01/mutation/remove-domain-01.output.ts'))
        .toEqual(`import { Field, ObjectType } from '@nestjs/graphql';

import { Domain01 } from '../domain-01.entity';

@ObjectType()
export class RemoveDomain01Output {
  @Field(() => Domain01)
  domain01!: Domain01;
}
`);
    });

    it('should generate "UpdateDomain01Input" class', () => {
      expect(tree.readContent('/domain-01/mutation/update-domain-01.input.ts'))
        .toEqual(`import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { CreateDomain01Input } from './create-domain-01.input';

@InputType()
export class UpdateDomain01Input extends OmitType(
  PartialType(CreateDomain01Input),
  [],
) {
  @Field(() => ID)
  id!: string;
}
`);
    });

    it('should generate "UpdateDomain01Output" class', () => {
      expect(tree.readContent('/domain-01/mutation/update-domain-01.output.ts'))
        .toEqual(`import { Field, ObjectType } from '@nestjs/graphql';

import { Domain01 } from '../domain-01.entity';

@ObjectType()
export class UpdateDomain01Output {
  @Field(() => Domain01)
  domain01!: Domain01;
}
`);
    });

    it('should generate "Domain01ById" class', () => {
      expect(tree.readContent('/domain-01/query/domain-01-by-id.type.ts'))
        .toEqual(`import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain01 } from '../domain-01.entity';

@InterfaceType()
export abstract class Domain01ById {
  @Field(() => ID, { nullable: true })
  domain01Id?: Maybe<string>;

  @Field(() => Domain01, { nullable: true })
  domain01?: Maybe<Domain01>;
}
`);
    });

    it('should generate "Domain01OrderInput" class', () => {
      expect(tree.readContent('/domain-01/query/domain-01-order.input.ts'))
        .toEqual(`import { InputType, OmitType } from '@nestjs/graphql';

import { ToOrderInputType } from '../../common/to-order-input-type';
import { Domain01 } from '../domain-01.entity';

@InputType()
export class Domain01OrderInput extends OmitType(
  ToOrderInputType(Domain01),
  [],
) {}
`);
    });

    it('should generate "Domain01PageArgs" class', () => {
      expect(tree.readContent('/domain-01/query/domain-01-page.args.ts'))
        .toEqual(`import { ArgsType } from '@nestjs/graphql';

import { NodePageArgs } from '../../common/node.page.args';
import { TypeField } from '../../common/type-field.decorator';
import { Domain01OrderInput } from './domain-01-order.input';
import { Domain01WhereInput } from './domain-01-where.input';

@ArgsType()
export class Domain01PageArgs extends NodePageArgs {
  @TypeField(() => Domain01OrderInput, {
    description: '排序欄位與方式',
    defaultValue: new Domain01OrderInput(),
  })
  order: Domain01OrderInput = new Domain01OrderInput();

  @TypeField(() => [Domain01WhereInput], {
    description: '查詢條件',
    defaultValue: [],
  })
  where: Domain01WhereInput[] = [];
}
`);
    });

    it('should generate "Domain01Page" class', () => {
      expect(tree.readContent('/domain-01/query/domain-01-page.type.ts'))
        .toEqual(`import { Field, ObjectType } from '@nestjs/graphql';

import { NodePage } from '../../common/node-page.type';
import { Domain01 } from '../domain-01.entity';

@ObjectType({
  implements: [NodePage],
})
export class Domain01Page implements NodePage<Domain01> {
  @Field(() => [Domain01], { description: 'Nodes in this page' })
  nodes!: Domain01[];
}
`);
    });

    it('should generate "Domain01WhereInput" class', () => {
      expect(tree.readContent('/domain-01/query/domain-01-where.input.ts'))
        .toEqual(`import { InputType, OmitType } from '@nestjs/graphql';
import { FindOptionsWhere } from 'typeorm';

import { ToWhereInputType } from '../../common/to-where-input-type';
import { Domain01 } from '../domain-01.entity';

@InputType()
export class Domain01WhereInput extends OmitType(
  ToWhereInputType(Domain01),
  [],
) {
  toFindOptionsWhere(): FindOptionsWhere<Domain01> {
    const { ...where } = this;
    return { ...where };
  }
}
`);
    });

    it('should generate "Domain01WhereInput" class', () => {
      expect(tree.readContent('/domain-01/query/domain-01.args.ts'))
        .toEqual(`import { ArgsType } from '@nestjs/graphql';

import { TypeField } from '../../common/type-field.decorator';
import { Domain01WhereInput } from './domain-01-where.input';

@ArgsType()
export class Domain01Args {
  @TypeField(() => [Domain01WhereInput], {
    description: '查詢條件',
    defaultValue: [],
  })
  where: Domain01WhereInput[] = [];
}
`);
    });
  });

  it('should create spec files', async () => {
    const options: DomainOptions = {
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
    const options: DomainOptions = {
      name: 'foo',
      type: 'rest',
      spec: true,
      specFileSuffix: 'test',
      flat: true,
    };
    const tree: UnitTestTree = await runner.runSchematic('domain', options);
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

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
        name: 'domain-0001',
        crud: true,
        type: 'graphql-code-first',
      };
      const tree = await runner.runSchematic('domain', options);
      const files = tree.files;
      expect(files).toEqual([
        '/domain-0001/domain-0001-by-id.loader.ts',
        '/domain-0001/domain-0001-by-id.resolver.ts',
        '/domain-0001/domain-0001.entity.ts',
        '/domain-0001/domain-0001.module.ts',
        '/domain-0001/domain-0001.repository.ts',
        '/domain-0001/domain-0001.resolver.ts',
        '/domain-0001/domain-0001.service.ts',
        '/domain-0001/domain-0001.resolver.spec.ts',
        '/domain-0001/domain-0001.service.spec.ts',
        '/domain-0001/mutation/create-domain-0001.input.ts',
        '/domain-0001/mutation/create-domain-0001.output.ts',
        '/domain-0001/mutation/remove-domain-0001.input.ts',
        '/domain-0001/mutation/remove-domain-0001.output.ts',
        '/domain-0001/mutation/update-domain-0001.input.ts',
        '/domain-0001/mutation/update-domain-0001.output.ts',
        '/domain-0001/query/domain-0001-by-id.type.ts',
        '/domain-0001/query/domain-0001-order.input.ts',
        '/domain-0001/query/domain-0001-page.args.ts',
        '/domain-0001/query/domain-0001-page.type.ts',
        '/domain-0001/query/domain-0001-where.input.ts',
      ]);
    });
  });
  describe('[GraphQL - Code first]', () => {
    const options: DomainOptions = {
      name: 'domain-0001',
      crud: true,
      type: 'graphql-code-first',
    };

    let tree: UnitTestTree;

    beforeAll(async () => {
      tree = await runner.runSchematic('domain', options);
    });

    it('should generate "Domain0001ByIdLoader" class', () => {
      expect(tree.readContent('/domain-0001/domain-0001-by-id.loader.ts'))
        .toEqual(`import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { Maybe } from 'graphql/jsutils/Maybe';
import { In } from 'typeorm';

import { Domain0001 } from './domain-0001.entity';
import { Domain0001Repository } from './domain-0001.repository';

@Injectable({ scope: Scope.REQUEST })
export class Domain0001ByIdLoader extends DataLoader<
  string,
  Maybe<Domain0001>
> {
  constructor(private readonly repo: Domain0001Repository) {
    super(async (keys: readonly string[]): Promise<Maybe<Domain0001>[]> => {
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

    it('should generate "Domain0001ByIdResolver" class', () => {
      expect(tree.readContent('/domain-0001/domain-0001-by-id.resolver.ts'))
        .toEqual(`import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0001ByIdLoader } from './domain-0001-by-id.loader';
import { Domain0001 } from './domain-0001.entity';
import { Domain0001ById } from './query/domain-0001-by-id.type';

@Resolver(() => Domain0001ById)
export class Domain0001ByIdResolver {
  constructor(private readonly loader: Domain0001ByIdLoader) {}

  @ResolveField(() => Domain0001, { nullable: true })
  async domain0001(
    @Parent() { domain0001Id, domain0001 }: Domain0001ById,
  ): Promise<Maybe<Domain0001>> {
    if (domain0001) return domain0001;
    if (domain0001Id) return this.loader.load(domain0001Id);
    return null;
  }
}
`);
    });

    it('should generate "Domain0001" class', () => {
      expect(tree.readContent('/domain-0001/domain-0001.entity.ts'))
        .toEqual(`import { ObjectType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Entity } from 'typeorm';

import { ColumnField } from '../common/column-field.decorator';
import { MetaEntity } from '../common/meta.entity';

@Entity()
@ObjectType({ implements: [MetaEntity] })
export class Domain0001 extends MetaEntity {
  @ColumnField({ type: 'int', nullable: true, comment: 'domain0001001' })
  domain0001001?: Maybe<number>;
}
`);
    });

    it('should generate "Domain0001Module" class', () => {
      expect(tree.readContent('/domain-0001/domain-0001.module.ts'))
        .toEqual(`import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Domain0001 } from './domain-0001.entity';
import { Domain0001Repository } from './domain-0001.repository';
import { Domain0001Resolver } from './domain-0001.resolver';
import { Domain0001Service } from './domain-0001.service';

@Module({
  imports: [TypeOrmModule.forFeature([Domain0001])],
  providers: [
    Domain0001Repository,
    Domain0001Service,
    Domain0001Resolver,
    // Domain0001ByIdLoader,
    // Domain0001ByIdResolver,
  ],
})
export class Domain0001Module {}
`);
    });

    it('should generate "Domain0001Repository" class', () => {
      expect(tree.readContent('/domain-0001/domain-0001.repository.ts'))
        .toEqual(`import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { BaseRepository } from '../common/base.repository';
import { Domain0001 } from './domain-0001.entity';

@Injectable()
export class Domain0001Repository extends BaseRepository<Domain0001> {
  constructor(readonly manager: EntityManager) {
    super(Domain0001, manager);
  }
}
`);
    });

    it('should generate "Domain0001Resolver" class', () => {
      expect(tree.readContent('/domain-0001/domain-0001.resolver.ts'))
        .toEqual(`import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Transactional } from 'typeorm-transactional';

import { Domain0001 } from './domain-0001.entity';
import { Domain0001Repository } from './domain-0001.repository';
import { Domain0001Service } from './domain-0001.service';
import { CreateDomain0001Input } from './mutation/create-domain-0001.input';
import { CreateDomain0001Output } from './mutation/create-domain-0001.output';
import { RemoveDomain0001Input } from './mutation/remove-domain-0001.input';
import { RemoveDomain0001Output } from './mutation/remove-domain-0001.output';
import { UpdateDomain0001Input } from './mutation/update-domain-0001.input';
import { UpdateDomain0001Output } from './mutation/update-domain-0001.output';
import { Domain0001PageArgs } from './query/domain-0001-page.args';
import { Domain0001Page } from './query/domain-0001-page.type';

@Resolver(() => Domain0001)
export class Domain0001Resolver {
  constructor(
    private readonly domain0001Repository: Domain0001Repository,
    private readonly domain0001Service: Domain0001Service,
  ) {}

  @Transactional()
  @Mutation(() => CreateDomain0001Output)
  async createDomain0001(
    @Args('input') input: CreateDomain0001Input,
  ): Promise<CreateDomain0001Output> {
    const domain0001 = await this.domain0001Service.saveOne(input);
    return { domain0001 };
  }

  @Transactional()
  @Query(() => Domain0001Page)
  domain0001Page(@Args() args: Domain0001PageArgs): Promise<Domain0001Page> {
    return this.domain0001Service.findPage(args);
  }

  @Transactional()
  @Query(() => Domain0001)
  domain0001(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Maybe<Domain0001>> {
    return this.domain0001Repository.findOne({ where: { id } });
  }

  @Transactional()
  @Mutation(() => UpdateDomain0001Output)
  async updateDomain0001(
    @Args('input') input: UpdateDomain0001Input,
  ): Promise<UpdateDomain0001Output> {
    const domain0001 = await this.domain0001Service.saveOne(input);
    return { domain0001 };
  }

  @Transactional()
  @Mutation(() => RemoveDomain0001Output)
  async removeDomain0001(
    @Args('input') input: RemoveDomain0001Input,
  ): Promise<RemoveDomain0001Output> {
    const domain0001 = await this.domain0001Service.removeOne(input.id);
    return { domain0001 };
  }
}
`);
    });

    it('should generate "Domain0001Service" class', () => {
      expect(tree.readContent('/domain-0001/domain-0001.service.ts'))
        .toEqual(`import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import { Domain0001 } from './domain-0001.entity';
import { Domain0001Repository } from './domain-0001.repository';
import { CreateDomain0001Input } from './mutation/create-domain-0001.input';
import { UpdateDomain0001Input } from './mutation/update-domain-0001.input';
import { Domain0001PageArgs } from './query/domain-0001-page.args';

@Injectable()
export class Domain0001Service {
  constructor(private readonly repo: Domain0001Repository) {}

  @Transactional()
  async saveOne(
    input: CreateDomain0001Input | UpdateDomain0001Input,
  ): Promise<Domain0001> {
    const domain0001 = await this.repo.save(input);

    return domain0001;
  }

  @Transactional()
  findPage(args: Domain0001PageArgs) {
    return this.repo.findNodePage(args);
  }

  @Transactional()
  async removeOne(id: string) {
    const domain0001 = await this.repo.findOneByOrFail({ id });

    return this.repo.softRemove(domain0001);
  }
}
`);
    });

    it('should generate "CreateDomain0001Input" class', () => {
      expect(
        tree.readContent('/domain-0001/mutation/create-domain-0001.input.ts'),
      ).toEqual(
        `import { InputType, OmitType } from '@nestjs/graphql';

import { ToCreateInputType } from '../../common/to-create-input-type';
import { Domain0001 } from '../domain-0001.entity';

@InputType()
export class CreateDomain0001Input extends OmitType(
  ToCreateInputType(Domain0001),
  [],
) {}
`,
      );
    });

    it('should generate "CreateDomain0001Output" class', () => {
      expect(
        tree.readContent('/domain-0001/mutation/create-domain-0001.output.ts'),
      ).toEqual(
        `import { Field, ObjectType } from '@nestjs/graphql';

import { Domain0001 } from '../domain-0001.entity';

@ObjectType()
export class CreateDomain0001Output {
  @Field(() => Domain0001)
  domain0001!: Domain0001;
}
`,
      );
    });

    it('should generate "RemoveDomain0001Input" class', () => {
      expect(
        tree.readContent('/domain-0001/mutation/remove-domain-0001.input.ts'),
      ).toEqual(`import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveDomain0001Input {
  @Field(() => ID)
  id!: string;
}
`);
    });

    it('should generate "RemoveDomain0001Output" class', () => {
      expect(
        tree.readContent('/domain-0001/mutation/remove-domain-0001.output.ts'),
      ).toEqual(`import { Field, ObjectType } from '@nestjs/graphql';

import { Domain0001 } from '../domain-0001.entity';

@ObjectType()
export class RemoveDomain0001Output {
  @Field(() => Domain0001)
  domain0001!: Domain0001;
}
`);
    });

    it('should generate "UpdateDomain0001Input" class', () => {
      expect(
        tree.readContent('/domain-0001/mutation/update-domain-0001.input.ts'),
      )
        .toEqual(`import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';

import { CreateDomain0001Input } from './create-domain-0001.input';

@InputType()
export class UpdateDomain0001Input extends OmitType(
  PartialType(CreateDomain0001Input),
  [],
) {
  @Field(() => ID)
  id!: string;
}
`);
    });

    it('should generate "UpdateDomain0001Output" class', () => {
      expect(
        tree.readContent('/domain-0001/mutation/update-domain-0001.output.ts'),
      ).toEqual(`import { Field, ObjectType } from '@nestjs/graphql';

import { Domain0001 } from '../domain-0001.entity';

@ObjectType()
export class UpdateDomain0001Output {
  @Field(() => Domain0001)
  domain0001!: Domain0001;
}
`);
    });

    it('should generate "Domain0001ById" class', () => {
      expect(tree.readContent('/domain-0001/query/domain-0001-by-id.type.ts'))
        .toEqual(`import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0001 } from '../domain-0001.entity';

@InterfaceType()
export abstract class Domain0001ById {
  @Field(() => ID, { nullable: true })
  domain0001Id?: Maybe<string>;

  @Field(() => Domain0001, { nullable: true })
  domain0001?: Maybe<Domain0001>;
}
`);
    });

    it('should generate "Domain0001OrderInput" class', () => {
      expect(tree.readContent('/domain-0001/query/domain-0001-order.input.ts'))
        .toEqual(`import { InputType, OmitType } from '@nestjs/graphql';

import { ToOrderInputType } from '../../common/to-order-input-type';
import { Domain0001 } from '../domain-0001.entity';

@InputType()
export class Domain0001OrderInput extends OmitType(
  ToOrderInputType(Domain0001),
  [],
) {}
`);
    });

    it('should generate "Domain0001PageArgs" class', () => {
      expect(tree.readContent('/domain-0001/query/domain-0001-page.args.ts'))
        .toEqual(`import { ArgsType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { NodePageArgs } from '../../common/node.page.args';
import { TypeField } from '../../common/type-field.decorator';
import { Domain0001OrderInput } from './domain-0001-order.input';
import { Domain0001WhereInput } from './domain-0001-where.input';

@ArgsType()
export class Domain0001PageArgs extends NodePageArgs {
  @TypeField(() => Domain0001OrderInput, {
    description: '排序欄位與方式',
    defaultValue: new Domain0001OrderInput(),
  })
  order: Domain0001OrderInput = new Domain0001OrderInput();

  @TypeField(() => [Domain0001WhereInput], {
    description: '查詢條件',
    nullable: true,
  })
  where?: Maybe<Domain0001WhereInput[]>;
}
`);
    });

    it('should generate "Domain0001Page" class', () => {
      expect(tree.readContent('/domain-0001/query/domain-0001-page.type.ts'))
        .toEqual(`import { Field, ObjectType } from '@nestjs/graphql';

import { NodePage } from '../../common/node-page.type';
import { Domain0001 } from '../domain-0001.entity';

@ObjectType({
  implements: [NodePage],
})
export class Domain0001Page implements NodePage<Domain0001> {
  @Field(() => [Domain0001], { description: 'Nodes in this page' })
  nodes!: Domain0001[];
}
`);
    });

    it('should generate "Domain0001WhereInput" class', () => {
      expect(tree.readContent('/domain-0001/query/domain-0001-where.input.ts'))
        .toEqual(`import { InputType, OmitType } from '@nestjs/graphql';
import { FindOptionsWhere } from 'typeorm';

import { DeepNullable } from '../../common/nullable.interface';
import { ToWhereInputType } from '../../common/to-where-input-type';
import { Domain0001 } from '../domain-0001.entity';

@InputType()
export class Domain0001WhereInput extends OmitType(
  ToWhereInputType(Domain0001),
  [],
) {
  toFindOptionsWhere(): DeepNullable<FindOptionsWhere<Domain0001>> {
    const { ...where } = this;
    return { ...where };
  }
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

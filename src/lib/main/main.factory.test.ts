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
        name: 'domain-01',
        crud: true,
        type: 'graphql-code-first',
      };
      const tree = await runner.runSchematic('main', options);
      const files = tree.files;
      expect(files).toEqual([
        '/domain-01/domain-01.entity.ts',
        '/domain-01/domain-01-by-domain-01-id.loader.ts',
        '/domain-01/domain-01.module.ts',
        '/domain-01/domain-01.repository.ts',
        '/domain-01/domain-01.resolver.spec.ts',
        '/domain-01/domain-01.resolver.ts',
        '/domain-01/domain-01.service.spec.ts',
        '/domain-01/domain-01.service.ts',
        '/domain-01/with-domain-01.resolver.ts',
        '/domain-01/args/domain-01-page.args.ts',
        '/domain-01/input/domain-01-order.input.ts',
        '/domain-01/input/domain-01-where.input.ts',
        '/domain-01/input/create-domain-01.input.ts',
        '/domain-01/input/remove-domain-01.input.ts',
        '/domain-01/input/update-domain-01.input.ts',
        '/domain-01/output/create-domain-01.output.ts',
        '/domain-01/output/remove-domain-01.output.ts',
        '/domain-01/output/update-domain-01.output.ts',
        '/domain-01/type/domain-01-page.type.ts',
        '/domain-01/type/with-domain-01.type.ts',
      ]);
    });
    describe('when "crud" option is not enabled', () => {
      it('should generate appropriate files (without dtos)', async () => {
        const options: MainOptions = {
          name: 'domain-01',
          crud: false,
          type: 'graphql-code-first',
        };
        const tree = await runner.runSchematic('main', options);
        const files = tree.files;
        expect(files).toEqual([
          '/domain-01/domain-01.entity.ts',
          '/domain-01/domain-01-by-domain-01-id.loader.ts',
          '/domain-01/domain-01.module.ts',
          '/domain-01/domain-01.repository.ts',
          '/domain-01/domain-01.resolver.spec.ts',
          '/domain-01/domain-01.resolver.ts',
          '/domain-01/domain-01.service.spec.ts',
          '/domain-01/domain-01.service.ts',
          '/domain-01/with-domain-01.resolver.ts',
          '/domain-01/args/domain-01-page.args.ts',
          '/domain-01/output/create-domain-01.output.ts',
          '/domain-01/output/remove-domain-01.output.ts',
          '/domain-01/output/update-domain-01.output.ts',
        ]);
      });
    });
    describe('when "spec" option is not enabled', () => {
      it('should generate appropriate files (without dtos)', async () => {
        const options: MainOptions = {
          name: 'domain-01',
          spec: false,
          crud: false,
          type: 'graphql-code-first',
        };
        const tree = await runner.runSchematic('main', options);
        const files = tree.files;
        expect(files).toEqual([
          '/domain-01/domain-01.entity.ts',
          '/domain-01/domain-01-by-domain-01-id.loader.ts',
          '/domain-01/domain-01.module.ts',
          '/domain-01/domain-01.repository.ts',
          '/domain-01/domain-01.resolver.ts',
          '/domain-01/domain-01.service.ts',
          '/domain-01/with-domain-01.resolver.ts',
          '/domain-01/args/domain-01-page.args.ts',
          '/domain-01/output/create-domain-01.output.ts',
          '/domain-01/output/remove-domain-01.output.ts',
          '/domain-01/output/update-domain-01.output.ts',
        ]);
      });
    });
  });
  describe('[GraphQL - Code first]', () => {
    const options: MainOptions = {
      name: 'domain-01',
      crud: true,
      type: 'graphql-code-first',
    };

    let tree: UnitTestTree;

    beforeAll(async () => {
      tree = await runner.runSchematic('main', options);
    });

    it('should generate "domain-01-page.args" class', () => {
      expect(tree.readContent('/domain-01/args/domain-01-page.args.ts'))
        .toEqual(`import { DaoNodePageArgs } from '@app/graphql-type/args/dao-node-page.args';
import { TypeField } from '@app/util/type-field.decorator';
import { ArgsType } from '@nestjs/graphql';

import { Domain01OrderInput } from '../input/domain-01-order.input';
import { Domain01WhereInput } from '../input/domain-01-where.input';

@ArgsType()
export class Domain01PageArgs extends DaoNodePageArgs {
  @TypeField(() => Domain01OrderInput, {
    description: '排序欄位與方式',
    defaultValue: new Domain01OrderInput(),
  })
  order: Domain01OrderInput = new Domain01OrderInput();

  @TypeField(() => Domain01WhereInput, {
    description: '查詢條件',
    defaultValue: new Domain01WhereInput(),
  })
  where: Domain01WhereInput = new Domain01WhereInput();
}
`);
    });

    it('should generate "create-domain-01.input" class', () => {
      expect(tree.readContent('/domain-01/input/create-domain-01.input.ts'))
        .toEqual(`import { ToCreateInputType } from '@app/graphql-type/to-create-input-type';
import { InputType, OmitType } from '@nestjs/graphql';

import { Domain01 } from '../domain-01.entity';

@InputType()
export class CreateDomain01Input extends OmitType(
  ToCreateInputType(Domain01),
  [],
) {}
`);
    });

    it('should generate "domain-01-order.input" class', () => {
      expect(tree.readContent('/domain-01/input/domain-01-order.input.ts'))
        .toEqual(`import { ToOrderInputType } from '@app/graphql-type/to-order-input-type';
import { InputType, OmitType } from '@nestjs/graphql';

import { Domain01 } from '../domain-01.entity';

@InputType()
export class Domain01OrderInput extends OmitType(
  ToOrderInputType(Domain01),
  [],
) {}
`);
    });

    it('should generate "domain-01-where.input" class', () => {
      expect(tree.readContent('/domain-01/input/domain-01-where.input.ts'))
        .toEqual(`import { DeepNullable } from '@app/graphql-type/nullable.interface';
import { ToWhereInputType } from '@app/graphql-type/to-where-input-type';
import { InputType, OmitType } from '@nestjs/graphql';
import { FindOptionsWhere } from 'typeorm';

import { Domain01 } from '../domain-01.entity';

@InputType()
export class Domain01WhereInput extends OmitType(ToWhereInputType(Domain01), []) {
  toFindOptionsWhere(): DeepNullable<FindOptionsWhere<Domain01>> {
    const { ...where } = this;

    return { ...where };
  }
}
`);
    });

    it('should generate "remove-domain-01.input" class', () => {
      expect(tree.readContent('/domain-01/input/remove-domain-01.input.ts'))
        .toEqual(`import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveDomain01Input {
  @Field(() => ID)
  id!: string;
}
`);
    });

    it('should generate "update-domain-01.input" class', () => {
      expect(tree.readContent('/domain-01/input/update-domain-01.input.ts'))
        .toEqual(`import { Field, ID, InputType, PartialType } from '@nestjs/graphql';

import { CreateDomain01Input } from './create-domain-01.input';

@InputType()
export class UpdateDomain01Input extends PartialType(
  CreateDomain01Input,
) {
  @Field(() => ID)
  id!: string;
}
`);
    });

    it('should generate "create-domain-01.output" class', () => {
      expect(tree.readContent('/domain-01/output/create-domain-01.output.ts'))
        .toEqual(`import { Field, ObjectType } from '@nestjs/graphql';

import { Domain01 } from '../domain-01.entity';

@ObjectType()
export class CreateDomain01Output {
  @Field(() => Domain01)
  domain01!: Domain01;
}
`);
    });

    it('should generate "remove-domain-01.output" class', () => {
      expect(tree.readContent('/domain-01/output/remove-domain-01.output.ts'))
        .toEqual(`import { Field, ObjectType } from '@nestjs/graphql';

import { Domain01 } from '../domain-01.entity';

@ObjectType()
export class RemoveDomain01Output {
  @Field(() => Domain01)
  domain01!: Domain01;
}
`);
    });

    it('should generate "update-domain-01.output" class', () => {
      expect(tree.readContent('/domain-01/output/update-domain-01.output.ts'))
        .toEqual(`import { Field, ObjectType } from '@nestjs/graphql';

import { Domain01 } from '../domain-01.entity';

@ObjectType()
export class UpdateDomain01Output {
  @Field(() => Domain01)
  domain01!: Domain01;
}
`);
    });

    it('should generate "domain-01-page.type" class', () => {
      expect(tree.readContent('/domain-01/type/domain-01-page.type.ts'))
        .toEqual(`import { Field, ObjectType } from '@nestjs/graphql';
import { MainDaoNodePage } from 'apps/main/src/common/main-dao-node-page.type';

import { Domain01 } from '../domain-01.entity';

@ObjectType('Domain01Page', {
  implements: [MainDaoNodePage],
})
export class Domain01PageType implements MainDaoNodePage<Domain01> {
  @Field(() => [Domain01], { description: 'Nodes in this page' })
  nodes!: Domain01[];
}
`);
    });

    it('should generate "with-domain-01.type" class', () => {
      expect(tree.readContent('/domain-01/type/with-domain-01.type.ts'))
        .toEqual(`import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain01 } from '../domain-01.entity';

@InterfaceType()
export abstract class WithDomain01 {
  @Field(() => ID, { nullable: true })
  domain01Id?: Maybe<string>;

  @Field(() => Domain01, { nullable: true })
  domain01?: Maybe<Domain01>;
}
`);
    });

    it('should generate "domain-01-by-domain-01-id.loader" class', () => {
      expect(tree.readContent('/domain-01/domain-01-by-domain-01-id.loader.ts'))
        .toEqual(`import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { Maybe } from 'graphql/jsutils/Maybe';
import { In } from 'typeorm';

import { Domain01 } from './domain-01.entity';
import { Domain01Repository } from './domain-01.repository';

@Injectable({ scope: Scope.REQUEST })
export class Domain01ByDomain01IdLoader extends DataLoader<string, Maybe<Domain01>> {
  constructor(private readonly repo: Domain01Repository) {
    super(async (keys: readonly string[]): Promise<Maybe<Domain01>[]> => {
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

    it('should generate "domain-01.entity" class', () => {
      expect(tree.readContent('/domain-01/domain-01.entity.ts'))
        .toEqual(`import { CustomBaseEntity } from '@app/db/entity/custom-base.entity';
import { VarcharLength } from '@app/enum/varchar-length.enum';
import { ColumnField } from '@app/util/column-field.decorator';
import { ObjectType } from '@nestjs/graphql';
import { MainDaoNode } from 'apps/main/src/common/main-dao-node.type';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Entity } from 'typeorm';

@ObjectType({ implements: [MainDaoNode] })
@Entity()
export class Domain01 extends CustomBaseEntity {
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

    it('should generate "domain-01.module" class', () => {
      expect(tree.readContent('/domain-01/domain-01.module.ts'))
        .toEqual(`import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Domain01 } from './domain-01.entity';
import { Domain01Resolver } from './domain-01.resolver';
import { Domain01Service } from './domain-01.service';

@Module({
  imports: [TypeOrmModule.forFeature([Domain01])],
  providers: [
    Domain01Resolver,
    Domain01Service,
    // Domain01ByDomain01IdLoader,
    // WithDomain01Resolver,
  ],
})
export class Domain01Module {}
`);
    });

    it('should generate "domain-01.resolver" class', () => {
      expect(tree.readContent('/domain-01/domain-01.resolver.ts'))
        .toEqual(`import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Transactional } from 'typeorm-transactional';

import { Domain01PageArgs } from './args/domain-01-page.args';
import { Domain01 } from './domain-01.entity';
import { Domain01Service } from './domain-01.service';
import { CreateDomain01Input } from './input/create-domain-01.input';
import { RemoveDomain01Input } from './input/remove-domain-01.input';
import { UpdateDomain01Input } from './input/update-domain-01.input';
import { CreateDomain01Output } from './output/create-domain-01.output';
import { RemoveDomain01Output } from './output/remove-domain-01.output';
import { UpdateDomain01Output } from './output/update-domain-01.output';
import { Domain01PageType } from './type/domain-01-page.type';

@Resolver(() => Domain01)
export class Domain01Resolver {
  constructor(private readonly domain01Service: Domain01Service) {}

  @Transactional()
  @Mutation(() => CreateDomain01Output)
  async createDomain01(@Args('input') input: CreateDomain01Input): Promise<CreateDomain01Output> {
    return this.domain01Service.createOne(input);
  }

  @Transactional()
  @Query(() => Domain01PageType)
  async domain01Page(@Args() args: Domain01PageArgs): Promise<Domain01PageType> {
    return this.domain01Service.findByPageArgs(args);
  }

  @Transactional()
  @Query(() => Domain01, { nullable: true })
  async domain01(@Args('id', { type: () => ID }) id: string): Promise<Maybe<Domain01>> {
    return this.domain01Service.findById(id);
  }

  @Transactional()
  @Mutation(() => UpdateDomain01Output)
  async updateDomain01(@Args('input') input: UpdateDomain01Input): Promise<UpdateDomain01Output> {
    return this.domain01Service.updateOne(input);
  }

  @Transactional()
  @Mutation(() => RemoveDomain01Output)
  async removeDomain01(@Args('input') input: RemoveDomain01Input): Promise<RemoveDomain01Output> {
    return this.domain01Service.removeOne(input.id);
  }
}
`);
    });

    it('should generate "domain-01.service" class', () => {
      expect(tree.readContent('/domain-01/domain-01.service.ts'))
        .toEqual(`import { DaoIdNotFoundError } from '@app/graphql-type/error/dao-id-not-found.error';
import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import { Domain01PageArgs } from './args/domain-01-page.args';
import { Domain01 } from './domain-01.entity';
import { Domain01Repository } from './domain-01.repository';
import { CreateDomain01Input } from './input/create-domain-01.input';
import { UpdateDomain01Input } from './input/update-domain-01.input';
import { CreateDomain01Output } from './output/create-domain-01.output';
import { RemoveDomain01Output } from './output/remove-domain-01.output';
import { UpdateDomain01Output } from './output/update-domain-01.output';
import { Domain01PageType } from './type/domain-01-page.type';

@Injectable()
export class Domain01Service {
  constructor(private readonly repo: Domain01Repository) {}

  @Transactional()
  async createOne(input: CreateDomain01Input): Promise<CreateDomain01Output> {
    const domain01 = await this.repo.save(input);

    return { domain01 };
  }

  @Transactional()
  async findByPageArgs(args: Domain01PageArgs): Promise<Domain01PageType> {
    return this.repo.findNodePage({ ...args, where: args.where.toFindOptionsWhere() });
  }

  @Transactional()
  async findById(id: string): Promise<Domain01 | null> {
    return this.repo.findOneBy({ id });
  }

  @Transactional()
  async updateOne(input: UpdateDomain01Input): Promise<UpdateDomain01Output> {
    const domain01 = await this.repo.preload({
      ...input,
    });
    if (!domain01) {
      throw new DaoIdNotFoundError(Domain01, input.id);
    }

    await this.repo.save(domain01);

    return {
      domain01,
    };
  }

  @Transactional()
  async removeOne(id: string): Promise<RemoveDomain01Output> {
    const domain01 = await this.repo.findOneByOrFail({ id });

    await this.repo.softRemove(domain01);

    return {
      domain01,
    };
  }
}
`);
    });

    it('should generate "with-domain-01.resolver" class', () => {
      expect(tree.readContent('/domain-01/with-domain-01.resolver.ts'))
        .toEqual(`import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain01ByDomain01IdLoader } from './domain-01-by-domain-01-id.loader';
import { Domain01 } from './domain-01.entity';
import { WithDomain01 } from './type/with-domain-01.type';

@Resolver(() => WithDomain01)
export class WithDomain01Resolver {
  constructor(
    private readonly loader: Domain01ByDomain01IdLoader,
  ) {}

  @ResolveField(() => Domain01, { nullable: true })
  async domain01(
    @Parent() { domain01Id, domain01 }: WithDomain01,
  ): Promise<Maybe<Domain01>> {
    if (domain01) return domain01;
    if (domain01Id) return this.loader.load(domain01Id);
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

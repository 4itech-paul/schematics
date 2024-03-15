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
        name: 'domain-1',
        crud: true,
        type: 'graphql-code-first',
      };
      const tree = await runner.runSchematic('domain', options);
      const files = tree.files;
      expect(files).toEqual([
        '/domain-1/domain-1-id.loader.ts',
        '/domain-1/domain-1-id.resolver.ts',
        '/domain-1/domain-1.entity.ts',
        '/domain-1/domain-1.module.ts',
        '/domain-1/domain-1.resolver.ts',
        '/domain-1/domain-1.service.ts',
        '/domain-1/mutation/create-domain-1.input.ts',
        '/domain-1/mutation/create-domain-1.output.ts',
        '/domain-1/mutation/remove-domain-1.input.ts',
        '/domain-1/mutation/remove-domain-1.output.ts',
        '/domain-1/mutation/update-domain-1.input.ts',
        '/domain-1/mutation/update-domain-1.output.ts',
        '/domain-1/query/domain-1-id.type.ts',
        '/domain-1/query/domain-1-order.input.ts',
        '/domain-1/query/domain-1-page.args.ts',
        '/domain-1/query/domain-1-page.type.ts',
        '/domain-1/query/domain-1-where.input.ts',
      ]);
    });
  });
  describe('[GraphQL - Code first]', () => {
    const options: DomainOptions = {
      name: 'domain-1',
      crud: true,
      type: 'graphql-code-first',
    };

    let tree: UnitTestTree;

    beforeAll(async () => {
      tree = await runner.runSchematic('domain', options);
    });

    it('should generate "Domain1" class', () => {
      expect(tree.readContent('/domain-1/domain-1-id.loader.ts'))
        .toEqual(`import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { Maybe } from 'graphql/jsutils/Maybe';
import { In, Repository } from 'typeorm';

import { Domain1 } from './domain-1.entity';

@Injectable({ scope: Scope.REQUEST })
export class Domain1IdLoader extends DataLoader<string, Maybe<Domain1>> {
  constructor(
    @InjectRepository(Domain1)
    private readonly repo: Repository<Domain1>,
  ) {
    super(async (keys: readonly string[]): Promise<Maybe<Domain1>[]> => {
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

    it('should generate "Domain1" class', () => {
      expect(tree.readContent('/domain-1/domain-1-id.resolver.ts'))
        .toEqual(`import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain1IdLoader } from './domain-1-id.loader';
import { Domain1 } from './domain-1.entity';
import { Domain1Id } from './query/domain-1-id.type';

@Resolver(() => Domain1Id)
export class Domain1IdResolver {
  constructor(private readonly loader: Domain1IdLoader) {}

  @ResolveField(() => Domain1, { nullable: true })
  async domain1(
    @Parent() { domain1Id, domain1 }: Domain1Id,
  ): Promise<Maybe<Domain1>> {
    if (domain1) return domain1;
    if (domain1Id) return this.loader.load(domain1Id);
    return null;
  }
}
`);
    });

    it('should generate "Domain1" class', () => {
      expect(tree.readContent('/domain-1/domain-1.entity.ts'))
        .toEqual(`import { ObjectType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { ColumnField } from 'src/common/column-field.decorator';
import { MetaEntity } from 'src/common/meta.entity';
import { Entity } from 'typeorm';

@Entity()
@ObjectType({ implements: MetaEntity })
export class Domain1 extends MetaEntity {
  @ColumnField({ type: 'int', nullable: true, comment: 'domain1001' })
  domain1001?: Maybe<number>;
}
`);
    });

    it('should generate "Domain1Module" class', () => {
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
    // Domain1IdLoader,
    // Domain1IdResolver,
  ],
})
export class Domain1Module {}
`);
    });

    it('should generate "Domain1Resolver" class', () => {
      expect(tree.readContent('/domain-1/domain-1.resolver.ts'))
        .toEqual(`import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { UserDecorator } from 'src/common/user.decorator';
import { User } from 'src/user/user.entity';

import { Domain1 } from './domain-1.entity';
import { Domain1Service } from './domain-1.service';
import { CreateDomain1Input } from './mutation/create-domain-1.input';
import { CreateDomain1Output } from './mutation/create-domain-1.output';
import { RemoveDomain1Input } from './mutation/remove-domain-1.input';
import { RemoveDomain1Output } from './mutation/remove-domain-1.output';
import { UpdateDomain1Input } from './mutation/update-domain-1.input';
import { UpdateDomain1Output } from './mutation/update-domain-1.output';
import { Domain1PageArgs } from './query/domain-1-page.args';
import { Domain1Page } from './query/domain-1-page.type';

@Resolver(() => Domain1)
export class Domain1Resolver {
  constructor(private readonly domain1Service: Domain1Service) {}

  @Mutation(() => CreateDomain1Output)
  async createDomain1(
    @Args('input') input: CreateDomain1Input,
    @UserDecorator() user: User,
  ): Promise<CreateDomain1Output> {
    const domain1 = await this.domain1Service.createOne(input, {
      user,
    });
    return { domain1 };
  }

  @Query(() => Domain1Page)
  domain1Page(@Args() args: Domain1PageArgs): Promise<Domain1Page> {
    return this.domain1Service.findPage(args);
  }

  @Query(() => Domain1)
  domain1(@Args('id', { type: () => ID }) id: string): Promise<Maybe<Domain1>> {
    return this.domain1Service.findOne({ where: { id } });
  }

  @Mutation(() => UpdateDomain1Output)
  async updateDomain1(
    @Args('input') input: UpdateDomain1Input,
    @UserDecorator() user: User,
  ): Promise<UpdateDomain1Output> {
    const domain1 = await this.domain1Service.updateOne(input, {
      user,
    });
    return { domain1 };
  }

  @Mutation(() => RemoveDomain1Output)
  async removeDomain1(
    @Args('input') input: RemoveDomain1Input,
    @UserDecorator() user: User,
  ): Promise<RemoveDomain1Output> {
    const domain1 = await this.domain1Service.removeOne(input.id, {
      user,
    });
    return { domain1 };
  }
}
`);
    });

    it('should generate "Domain1Service" class', () => {
      expect(tree.readContent('/domain-1/domain-1.service.ts'))
        .toEqual(`import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { ServiceOptions } from 'src/common/service-options.interface';
import { EntityManager, Repository } from 'typeorm';

import { Domain1 } from './domain-1.entity';
import { CreateDomain1Input } from './mutation/create-domain-1.input';
import { UpdateDomain1Input } from './mutation/update-domain-1.input';
import { Domain1PageArgs } from './query/domain-1-page.args';

@Injectable()
export class Domain1Service extends BaseService<Domain1> {
  constructor(
    private readonly manager: EntityManager,
    @InjectRepository(Domain1)
    readonly repo: Repository<Domain1>,
  ) {
    super(repo);
  }

  async createOne(
    input: CreateDomain1Input | Domain1,
    options: ServiceOptions,
  ): Promise<Domain1> {
    const transaction = async (manager: EntityManager) => {
      return this.save(input, { manager, user: options.user });
    };

    return options.manager
      ? transaction(options.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }

  findPage(args: Domain1PageArgs, options?: ServiceOptions) {
    return this.findNodePage(args, options);
  }

  async updateOne(input: UpdateDomain1Input, options: ServiceOptions) {
    const transaction = async (manager: EntityManager) => {
      const existDomain1 = await this.findOneOrFail(
        {
          where: { id: input.id },
        },
        { manager },
      );

      return this.save(
        {
          ...existDomain1,
          ...input,
        },
        { manager, user: options.user },
      );
    };

    return options.manager
      ? transaction(options.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }

  async removeOne(id: string, options: ServiceOptions) {
    const transaction = async (manager: EntityManager) => {
      const domain1 = await this.findOneByOrFail({ id });

      return this.softRemove(domain1, { manager, user: options?.user });
    };

    return options.manager
      ? transaction(options.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }
}
`);
    });

    it('should generate "CreateDomain1Input" class', () => {
      expect(
        tree.readContent('/domain-1/mutation/create-domain-1.input.ts'),
      ).toEqual(
        `import { InputType, OmitType } from '@nestjs/graphql';
import { ToCreateInputType } from 'src/common/to-create-input-type';

import { Domain1 } from '../domain-1.entity';

@InputType()
export class CreateDomain1Input extends OmitType(
  ToCreateInputType(Domain1),
  [],
) {}
`,
      );
    });

    it('should generate "CreateDomain1Output" class', () => {
      expect(
        tree.readContent('/domain-1/mutation/create-domain-1.output.ts'),
      ).toEqual(
        `import { Field, ObjectType } from '@nestjs/graphql';

import { Domain1 } from '../domain-1.entity';

@ObjectType()
export class CreateDomain1Output {
  @Field(() => Domain1)
  domain1!: Domain1;
}
`,
      );
    });

    it('should generate "RemoveDomain1Input" class', () => {
      expect(tree.readContent('/domain-1/mutation/remove-domain-1.input.ts'))
        .toEqual(`import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveDomain1Input {
  @Field(() => ID)
  id!: string;
}
`);
    });

    it('should generate "RemoveDomain1Output" class', () => {
      expect(tree.readContent('/domain-1/mutation/remove-domain-1.output.ts'))
        .toEqual(`import { Field, ObjectType } from '@nestjs/graphql';

import { Domain1 } from '../domain-1.entity';

@ObjectType()
export class RemoveDomain1Output {
  @Field(() => Domain1)
  domain1!: Domain1;
}
`);
    });

    it('should generate "UpdateDomain1Input" class', () => {
      expect(tree.readContent('/domain-1/mutation/update-domain-1.input.ts'))
        .toEqual(`import { Field, ID, InputType, PartialType } from '@nestjs/graphql';

import { CreateDomain1Input } from './create-domain-1.input';

@InputType()
export class UpdateDomain1Input extends PartialType(CreateDomain1Input) {
  @Field(() => ID)
  id!: string;
}
`);
    });

    it('should generate "UpdateDomain1Output" class', () => {
      expect(tree.readContent('/domain-1/mutation/update-domain-1.output.ts'))
        .toEqual(`import { Field, ObjectType } from '@nestjs/graphql';

import { Domain1 } from '../domain-1.entity';

@ObjectType()
export class UpdateDomain1Output {
  @Field(() => Domain1)
  domain1!: Domain1;
}
`);
    });

    it('should generate "Domain1OrderInput" class', () => {
      expect(tree.readContent('/domain-1/query/domain-1-id.type.ts'))
        .toEqual(`import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain1 } from '../domain-1.entity';

@InterfaceType()
export abstract class Domain1Id {
  @Field(() => ID, { nullable: true })
  domain1Id?: Maybe<string>;

  @Field(() => Domain1, { nullable: true })
  domain1?: Maybe<Domain1>;
}
`);
    });

    it('should generate "Domain1OrderInput" class', () => {
      expect(tree.readContent('/domain-1/query/domain-1-order.input.ts'))
        .toEqual(`import { InputType, OmitType } from '@nestjs/graphql';
import { ToOrderInputType } from 'src/common/to-order-input-type';

import { Domain1 } from '../domain-1.entity';

@InputType()
export class Domain1OrderInput extends OmitType(
  ToOrderInputType(Domain1),
  [],
) {}
`);
    });

    it('should generate "Domain1PageArgs" class', () => {
      expect(tree.readContent('/domain-1/query/domain-1-page.args.ts'))
        .toEqual(`import { ArgsType } from '@nestjs/graphql';
import { NodePageArgs } from 'src/common/node.page.args';
import { TypeField } from 'src/common/type-field.decorator';

import { Domain1OrderInput } from './domain-1-order.input';
import { Domain1WhereInput } from './domain-1-where.input';

@ArgsType()
export class Domain1PageArgs extends NodePageArgs {
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

    it('should generate "Domain1Page" class', () => {
      expect(tree.readContent('/domain-1/query/domain-1-page.type.ts'))
        .toEqual(`import { Field, ObjectType } from '@nestjs/graphql';
import { NodePage } from 'src/common/node-page.type';

import { Domain1 } from '../domain-1.entity';

@ObjectType({
  implements: [NodePage],
})
export class Domain1Page implements NodePage<Domain1> {
  @Field(() => [Domain1], { description: 'Nodes in this page' })
  nodes!: Domain1[];
}
`);
    });

    it('should generate "Domain1WhereInput" class', () => {
      expect(tree.readContent('/domain-1/query/domain-1-where.input.ts'))
        .toEqual(`import { InputType, OmitType } from '@nestjs/graphql';
import { Nullable } from 'src/common/nullable.interface';
import { ToWhereInputType } from 'src/common/to-where-input-type';
import { FindOptionsWhere } from 'typeorm';

import { Domain1 } from '../domain-1.entity';

@InputType()
export class Domain1WhereInput extends OmitType(ToWhereInputType(Domain1), []) {
  toFindOptionsWhere(): Nullable<FindOptionsWhere<Domain1>> | undefined {
    const { ...where } = this;
    return { ...where };
  }
}
`);
    });
  });
});

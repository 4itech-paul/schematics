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
        '/domain-0001/domain-0001-id.loader.ts',
        '/domain-0001/domain-0001-id.resolver.ts',
        '/domain-0001/domain-0001.entity.ts',
        '/domain-0001/domain-0001.module.ts',
        '/domain-0001/domain-0001.resolver.ts',
        '/domain-0001/domain-0001.service.ts',
        '/domain-0001/mutation/create-domain-0001.input.ts',
        '/domain-0001/mutation/create-domain-0001.output.ts',
        '/domain-0001/mutation/remove-domain-0001.input.ts',
        '/domain-0001/mutation/remove-domain-0001.output.ts',
        '/domain-0001/mutation/update-domain-0001.input.ts',
        '/domain-0001/mutation/update-domain-0001.output.ts',
        '/domain-0001/query/domain-0001-id.type.ts',
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

    it('should generate "Domain0001IdLoader" class', () => {
      expect(tree.readContent('/domain-0001/domain-0001-id.loader.ts'))
        .toEqual(`import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { Maybe } from 'graphql/jsutils/Maybe';
import { In, Repository } from 'typeorm';

import { Domain0001 } from './domain-0001.entity';

@Injectable({ scope: Scope.REQUEST })
export class Domain0001IdLoader extends DataLoader<string, Maybe<Domain0001>> {
  constructor(
    @InjectRepository(Domain0001)
    private readonly repo: Repository<Domain0001>,
  ) {
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

    it('should generate "Domain0001IdResolver" class', () => {
      expect(tree.readContent('/domain-0001/domain-0001-id.resolver.ts'))
        .toEqual(`import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0001IdLoader } from './domain-0001-id.loader';
import { Domain0001 } from './domain-0001.entity';
import { Domain0001Id } from './query/domain-0001-id.type';

@Resolver(() => Domain0001Id)
export class Domain0001IdResolver {
  constructor(private readonly loader: Domain0001IdLoader) {}

  @ResolveField(() => Domain0001, { nullable: true })
  async domain0001(
    @Parent() { domain0001Id, domain0001 }: Domain0001Id,
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
import { ColumnField } from 'src/common/column-field.decorator';
import { MetaEntity } from 'src/common/meta.entity';
import { Entity } from 'typeorm';

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
import { Domain0001Resolver } from './domain-0001.resolver';
import { Domain0001Service } from './domain-0001.service';

@Module({
  imports: [TypeOrmModule.forFeature([Domain0001])],
  providers: [
    Domain0001Resolver,
    Domain0001Service,
    // Domain0001IdLoader,
    // Domain0001IdResolver,
  ],
})
export class Domain0001Module {}
`);
    });

    it('should generate "Domain0001Resolver" class', () => {
      expect(tree.readContent('/domain-0001/domain-0001.resolver.ts'))
        .toEqual(`import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { UserDecorator } from 'src/common/user.decorator';
import { User } from 'src/user/user.entity';

import { Domain0001 } from './domain-0001.entity';
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
  constructor(private readonly domain0001Service: Domain0001Service) {}

  @Mutation(() => CreateDomain0001Output)
  async createDomain0001(
    @Args('input') input: CreateDomain0001Input,
    @UserDecorator() user: User,
  ): Promise<CreateDomain0001Output> {
    const domain0001 = await this.domain0001Service.saveOne(input, {
      user,
    });
    return { domain0001 };
  }

  @Query(() => Domain0001Page)
  domain0001Page(@Args() args: Domain0001PageArgs): Promise<Domain0001Page> {
    return this.domain0001Service.findPage(args);
  }

  @Query(() => Domain0001)
  domain0001(@Args('id', { type: () => ID }) id: string): Promise<Maybe<Domain0001>> {
    return this.domain0001Service.findOne({ where: { id } });
  }

  @Mutation(() => UpdateDomain0001Output)
  async updateDomain0001(
    @Args('input') input: UpdateDomain0001Input,
    @UserDecorator() user: User,
  ): Promise<UpdateDomain0001Output> {
    const domain0001 = await this.domain0001Service.saveOne(input, {
      user,
    });
    return { domain0001 };
  }

  @Mutation(() => RemoveDomain0001Output)
  async removeDomain0001(
    @Args('input') input: RemoveDomain0001Input,
    @UserDecorator() user: User,
  ): Promise<RemoveDomain0001Output> {
    const domain0001 = await this.domain0001Service.removeOne(input.id, {
      user,
    });
    return { domain0001 };
  }
}
`);
    });

    it('should generate "Domain0001Service" class', () => {
      expect(tree.readContent('/domain-0001/domain-0001.service.ts'))
        .toEqual(`import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { ServiceOptions } from 'src/common/service-options.interface';
import { EntityManager, Repository } from 'typeorm';

import { Domain0001 } from './domain-0001.entity';
import { CreateDomain0001Input } from './mutation/create-domain-0001.input';
import { UpdateDomain0001Input } from './mutation/update-domain-0001.input';
import { Domain0001PageArgs } from './query/domain-0001-page.args';

@Injectable()
export class Domain0001Service extends BaseService<Domain0001> {
  constructor(
    @InjectRepository(Domain0001)
    readonly repo: Repository<Domain0001>,
    private readonly manager: EntityManager,
  ) {
    super(repo);
  }

  async saveOne(
    input: CreateDomain0001Input | UpdateDomain0001Input,
    options: ServiceOptions,
  ): Promise<Domain0001> {
    const transaction = async (manager: EntityManager) => {
      const domain0001 = await this.save(input, { manager, user: options.user });

      return domain0001;
    };

    return options.manager
      ? transaction(options.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }

  findPage(args: Domain0001PageArgs, options?: ServiceOptions) {
    return this.findNodePage(args, options);
  }

  async removeOne(id: string, options: ServiceOptions) {
    const transaction = async (manager: EntityManager) => {
      const domain0001 = await this.findOneByOrFail({ id });

      return this.softRemove(domain0001, { manager, user: options?.user });
    };

    return options.manager
      ? transaction(options.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }
}
`);
    });

    it('should generate "CreateDomain0001Input" class', () => {
      expect(
        tree.readContent('/domain-0001/mutation/create-domain-0001.input.ts'),
      ).toEqual(
        `import { InputType, OmitType } from '@nestjs/graphql';
import { ToCreateInputType } from 'src/common/to-create-input-type';

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
      expect(tree.readContent('/domain-0001/mutation/remove-domain-0001.input.ts'))
        .toEqual(`import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveDomain0001Input {
  @Field(() => ID)
  id!: string;
}
`);
    });

    it('should generate "RemoveDomain0001Output" class', () => {
      expect(tree.readContent('/domain-0001/mutation/remove-domain-0001.output.ts'))
        .toEqual(`import { Field, ObjectType } from '@nestjs/graphql';

import { Domain0001 } from '../domain-0001.entity';

@ObjectType()
export class RemoveDomain0001Output {
  @Field(() => Domain0001)
  domain0001!: Domain0001;
}
`);
    });

    it('should generate "UpdateDomain0001Input" class', () => {
      expect(tree.readContent('/domain-0001/mutation/update-domain-0001.input.ts'))
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
      expect(tree.readContent('/domain-0001/mutation/update-domain-0001.output.ts'))
        .toEqual(`import { Field, ObjectType } from '@nestjs/graphql';

import { Domain0001 } from '../domain-0001.entity';

@ObjectType()
export class UpdateDomain0001Output {
  @Field(() => Domain0001)
  domain0001!: Domain0001;
}
`);
    });

    it('should generate "Domain0001OrderInput" class', () => {
      expect(tree.readContent('/domain-0001/query/domain-0001-id.type.ts'))
        .toEqual(`import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0001 } from '../domain-0001.entity';

@InterfaceType()
export abstract class Domain0001Id {
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
import { ToOrderInputType } from 'src/common/to-order-input-type';

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
import { NodePageArgs } from 'src/common/node.page.args';
import { TypeField } from 'src/common/type-field.decorator';

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
import { NodePage } from 'src/common/node-page.type';

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
import { Nullable } from 'src/common/nullable.interface';
import { ToWhereInputType } from 'src/common/to-where-input-type';
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
  });
});

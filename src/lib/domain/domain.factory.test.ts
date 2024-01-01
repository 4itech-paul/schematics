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
      expect(tree.readContent('/domain-1/domain-1.entity.ts'))
        .toEqual(`import { Field, ObjectType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { MetaEntity } from 'src/common/meta.entity';
import { Column, Entity } from 'typeorm';

@ObjectType({ implements: MetaEntity })
@Entity()
export class Domain1 extends MetaEntity {
  @Field(() => String, { description: '#', nullable: true })
  @Column({
    type: 'varchar',
    length: 10,
    comment: '#',
    nullable: true,
  })
  exampleField?: Maybe<string>;
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
  providers: [Domain1Resolver, Domain1Service],
})
export class Domain1Module {}
`);
    });

    it('should generate "Domain1Resolver" class', () => {
      expect(tree.readContent('/domain-1/domain-1.resolver.ts'))
        .toEqual(`import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { UserDecorator } from 'src/common/security/user.decorator';
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
    const domain1 = await this.domain1Service.createOne(input, { user });
    return { domain1 };
  }

  @Query(() => Domain1Page)
  async domain1Page(@Args() args: Domain1PageArgs): Promise<Domain1Page> {
    return this.domain1Service.findPage(args);
  }

  @Query(() => Domain1)
  async domain1(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Maybe<Domain1>> {
    return this.domain1Service.findOne({ where: { id } });
  }

  @Mutation(() => UpdateDomain1Output)
  async updateDomain1(
    @Args('input') input: UpdateDomain1Input,
    @UserDecorator() user: User,
  ): Promise<UpdateDomain1Output> {
    const domain1 = await this.domain1Service.updateOne(input, { user });
    return { domain1 };
  }

  @Mutation(() => RemoveDomain1Output)
  async removeDomain1(
    @Args('input') input: RemoveDomain1Input,
    @UserDecorator() user: User,
  ): Promise<RemoveDomain1Output> {
    const domain1 = await this.domain1Service.removeOne(input.id, { user });
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
import { IServiceMetadata } from 'src/common/interface/service-metadata.interface';
import { NodeIdNotFoundError } from 'src/common/node-id-not-found.error';
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
    readonly domain1Repo: Repository<Domain1>,
  ) {
    super(domain1Repo);
  }

  async createOne(
    input: CreateDomain1Input | Domain1,
    metadata?: IServiceMetadata,
  ): Promise<Domain1> {
    const create = async (manager: EntityManager) => {
      const dao = input instanceof Domain1 ? input : this.create(input);
      if (metadata?.user) {
        dao.createUserId = metadata.user.id;
        dao.updateUserId = metadata.user.id;
      }
      return this.save(dao, { manager });
    };

    if (metadata?.manager) {
      return create(metadata.manager);
    }

    return this.manager.transaction('READ COMMITTED', create);
  }

  findPage(args: Domain1PageArgs, metadata?: IServiceMetadata) {
    return this.findNodePage(args, metadata);
  }

  async updateOne(
    input: UpdateDomain1Input,
    metadata: IServiceMetadata,
  ): Promise<Domain1> {
    const update = async (manager: EntityManager) => {
      const domain1Repo = manager.getRepository(Domain1);
      const existDomain1 = await domain1Repo.findOne({
        where: { id: input.id },
      });
      if (!existDomain1) {
        throw new NodeIdNotFoundError(Domain1, input.id);
      }

      return this.save(
        {
          ...existDomain1,
          ...input,
          updateUserId: metadata?.user?.id,
        },
        { manager },
      );
    };

    if (metadata?.manager) {
      return update(metadata.manager);
    }

    return this.manager.transaction('READ COMMITTED', update);
  }

  async removeOne(id: string, metadata: IServiceMetadata): Promise<Domain1> {
    const remove = async (manager: EntityManager) => {
      const domain1Repo = manager.getRepository(Domain1);

      const domain1 = await domain1Repo.findOneBy({ id });
      if (!domain1) {
        throw new NodeIdNotFoundError(Domain1, id);
      }

      return domain1Repo.softRemove(domain1);
    };

    if (metadata?.manager) {
      return remove(metadata.manager);
    }

    return this.manager.transaction('READ COMMITTED', remove);
  }
}
`);
    });

    it('should generate "CreateDomain1Input" class', () => {
      expect(
        tree.readContent('/domain-1/mutation/create-domain-1.input.ts'),
      ).toEqual(
        `import { InputType } from '@nestjs/graphql';
import { OmitMetaEntityType } from 'src/common/omit-meta-entity-type';

import { Domain1 } from '../domain-1.entity';

@InputType()
export class CreateDomain1Input extends OmitMetaEntityType(
  Domain1,
  [] as const,
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
      expect(tree.readContent('/domain-1/query/domain-1-order.input.ts'))
        .toEqual(`import { Field, InputType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { NodeOrderEnum } from 'src/common/query/node-order.enum';
import { NodeOrderInput } from 'src/common/query/node-order.input';

@InputType()
export class Domain1OrderInput extends NodeOrderInput {
  @Field(() => NodeOrderEnum, { nullable: true })
  exampleField?: Maybe<NodeOrderEnum>;
}
`);
    });

    it('should generate "Domain1PageArgs" class', () => {
      expect(tree.readContent('/domain-1/query/domain-1-page.args.ts'))
        .toEqual(`import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { NodePageArgs } from 'src/common/query/node.page.args';

import { Domain1OrderInput } from './domain-1-order.input';
import { Domain1WhereInput } from './domain-1-where.input';

@ArgsType()
export class Domain1PageArgs extends NodePageArgs {
  @ValidateNested()
  @Type(() => Domain1OrderInput)
  @Field(() => Domain1OrderInput, {
    description: '排序欄位與方式',
    defaultValue: new Domain1OrderInput(),
  })
  order: Domain1OrderInput = new Domain1OrderInput();

  @ValidateNested()
  @Type(() => Domain1WhereInput)
  @Field(() => Domain1WhereInput, {
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
import { NodePage } from 'src/common/query/node-page.type';

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
        .toEqual(`import { InputType } from '@nestjs/graphql';
import { Nullable } from 'src/common/interface/nullable.interface';
import { PartialAndOmitType } from 'src/common/partial-and-omit-type';
import { FindOptionsWhere } from 'typeorm';

import { Domain1 } from '../domain-1.entity';

@InputType()
export class Domain1WhereInput extends PartialAndOmitType(Domain1, []) {
  toFindOptionsWhere(): Nullable<FindOptionsWhere<Domain1>> | undefined {
    const { ...where } = this;
    return { ...where };
  }
}
`);
    });
  });
});

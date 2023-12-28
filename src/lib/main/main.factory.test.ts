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
        name: 'users',
        crud: true,
        type: 'graphql-code-first',
      };
      const tree = await runner.runSchematic('main', options);
      const files = tree.files;
      expect(files).toEqual([
        '/users/users.module.ts',
        '/users/users.resolver.spec.ts',
        '/users/users.resolver.ts',
        '/users/users.service.spec.ts',
        '/users/users.service.ts',
        '/users/args/user-page.args.ts',
        '/users/input/user-order.input.ts',
        '/users/input/user-where.input.ts',
        '/users/input/create-user.input.ts',
        '/users/input/remove-user.input.ts',
        '/users/input/update-user.input.ts',
        '/users/output/create-user.output.ts',
        '/users/output/remove-user.output.ts',
        '/users/output/update-user.output.ts',
        '/users/type/user.type.ts',
        '/users/type/user-page.type.ts',
      ]);
    });
    describe('when "crud" option is not enabled', () => {
      it('should generate appropriate files (without dtos)', async () => {
        const options: MainOptions = {
          name: 'users',
          crud: false,
          type: 'graphql-code-first',
        };
        const tree = await runner.runSchematic('main', options);
        const files = tree.files;
        expect(files).toEqual([
          '/users/users.module.ts',
          '/users/users.resolver.spec.ts',
          '/users/users.resolver.ts',
          '/users/users.service.spec.ts',
          '/users/users.service.ts',
          '/users/args/user-page.args.ts',
          '/users/output/create-user.output.ts',
          '/users/output/remove-user.output.ts',
          '/users/output/update-user.output.ts',
        ]);
      });
    });
    describe('when "spec" option is not enabled', () => {
      it('should generate appropriate files (without dtos)', async () => {
        const options: MainOptions = {
          name: 'users',
          spec: false,
          crud: false,
          type: 'graphql-code-first',
        };
        const tree = await runner.runSchematic('main', options);
        const files = tree.files;
        expect(files).toEqual([
          '/users/users.module.ts',
          '/users/users.resolver.ts',
          '/users/users.service.ts',
          '/users/args/user-page.args.ts',
          '/users/output/create-user.output.ts',
          '/users/output/remove-user.output.ts',
          '/users/output/update-user.output.ts',
        ]);
      });
    });
  });
  describe('[GraphQL - Code first]', () => {
    const options: MainOptions = {
      name: 'users',
      crud: true,
      type: 'graphql-code-first',
    };

    let tree: UnitTestTree;

    beforeAll(async () => {
      tree = await runner.runSchematic('main', options);
    });

    it('should generate "UsersResolver" class', () => {
      expect(tree.readContent('/users/users.resolver.ts'))
        .toEqual(`import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { User } from '../auth/user.decorator';
import { UserType } from '../user/type/user.type';
import { UserPageArgs } from './args/user-page.args';
import { CreateUserInput } from './input/create-user.input';
import { RemoveUserInput } from './input/remove-user.input';
import { UpdateUserInput } from './input/update-user.input';
import { UserService } from './users.service';
import { CreateUserOutput } from './output/create-user.output';
import { RemoveUserOutput } from './output/remove-user.output';
import { UpdateUserOutput } from './output/update-user.output';
import { UserPageType } from './type/user-page.type';
import { UserType } from './type/user.type';

@Resolver(() => UserType)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Mutation(() => CreateUserOutput)
  async createUser(
    @Args('input') input: CreateUserInput,
    @User() user: UserType,
  ): Promise<CreateUserOutput> {
    return this.userService.createOne(input, user);
  }

  @Query(() => UserPageType)
  async userPage(
    @Args() args: UserPageArgs,
  ): Promise<UserPageType> {
    return this.userService.findByPageArgs(args);
  }

  @Query(() => UserType)
  async user(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Maybe<UserType>> {
    return this.userService.findById(id);
  }

  @Mutation(() => UpdateUserOutput)
  async updateUser(
    @Args('input') input: UpdateUserInput,
    @User() user: UserType,
  ): Promise<UpdateUserOutput> {
    return this.userService.updateOne(input.id, input, user);
  }

  @Mutation(() => RemoveUserOutput)
  async removeUser(
    @Args('input') input: RemoveUserInput,
  ): Promise<RemoveUserOutput> {
    return this.userService.removeOne(input.id);
  }
}
`);
    });
    it('should generate "UsersService" class', () => {
      expect(tree.readContent('/users/users.service.ts'))
        .toEqual(`import { User } from '@app/db/entity/user.entity';
import { GraphqlTypeService } from '@app/graphql-type';
import { DaoIdNotFoundError } from '@app/graphql-type/error/dao-id-not-found.error';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { ServiceMetadata } from '../common/service-metadata.interface';
import { UserType } from '../user/type/user.type';
import { UserPageArgs } from './args/user-page.args';
import { CreateUserInput } from './input/create-user.input';
import { UpdateUserInput } from './input/update-user.input';
import { CreateUserOutput } from './output/create-user.output';
import { RemoveUserOutput } from './output/remove-user.output';
import { UpdateUserOutput } from './output/update-user.output';
import { UserPageType } from './type/user-page.type';

@Injectable()
export class UserService {
  constructor(
    private readonly manager: EntityManager,
    private readonly graphqlTypeService: GraphqlTypeService,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async createOne(
    input: CreateUserInput,
    user: UserType,
    metadata?: Pick<ServiceMetadata, 'manager'>,
  ): Promise<CreateUserOutput> {
    const create = async (manager: EntityManager) => {
      const userRepo = manager.getRepository(User);

      const user = userRepo.create({
        ...input,
        createdBy: user.id,
        updatedBy: user.id,
      });

      await userRepo.save(
        user,
      );

      return { user };
    };

    if (metadata?.manager) {
      return create(metadata.manager);
    }

    return this.manager.transaction('READ COMMITTED', create);
  }

  async findByPageArgs(
    args: UserPageArgs,
    metadata?: Pick<ServiceMetadata, 'manager'>,
  ): Promise<UserPageType> {
    const userRepo = metadata?.manager
      ? metadata.manager.getRepository(User)
      : this.userRepo;

    const { take, skip, order, where } = args;

    return this.graphqlTypeService.daoNodePage(
      userRepo,
      { take, skip, order },
      where,
    );
  }

  async findById(
    id: string,
    metadata?: Pick<ServiceMetadata, 'manager'>,
  ): Promise<User | null> {
    if (metadata?.manager) {
      const userRepo = metadata.manager.getRepository(User);
      return userRepo.findOneBy({ id });
    }

    return this.userRepo.findOneBy({ id });
  }

  async updateOne(
    id: string,
    input: UpdateUserInput,
    user: UserType,
    metadata?: Pick<ServiceMetadata, 'manager'>,
  ): Promise<UpdateUserOutput> {
    const update = async (manager: EntityManager) => {
      const userRepo = manager.getRepository(User);

      const user = await userRepo.preload({
        ...input,
        updatedBy: user.id,
        id,
      });
      if (!user) {
        throw new DaoIdNotFoundError(User, id);
      }

      await userRepo.save(
        user,
      );

      return {
        user,
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
  ): Promise<RemoveUserOutput> {
    const remove = async (manager: EntityManager) => {
      const userRepo = manager.getRepository(User);

      const user = await userRepo.findOneBy({ id });
      if (!user) {
        throw new DaoIdNotFoundError(User, id);
      }

      const result = await userRepo.softRemove(user);

      return {
        user: result,
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

    it('should generate "UsersModule" class', () => {
      expect(tree.readContent('/users/users.module.ts'))
        .toEqual(`import { Users } from '@app/db/entity/users.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
`);
    });

    it('should generate "UserType" class', () => {
      expect(tree.readContent('/users/type/user.type.ts'))
        .toEqual(`import { DaoNode } from '@app/graphql-type/type/dao-node.type';
import { GraphNode } from '@app/graphql-type/type/graph-node.type';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('User', {
  implements: [GraphNode, DaoNode],
})
export class UserType extends DaoNode {
  @Field(() => String, { nullable: true })
  exampleField?: string;
}
`);
    });

    it('should generate "UserPageType" class', () => {
      expect(tree.readContent('/users/type/user-page.type.ts'))
        .toEqual(`import { DaoNodePage } from '@app/graphql-type/type/dao-node-page.type';
import { Field, ObjectType } from '@nestjs/graphql';

import { UserType } from './user.type';

@ObjectType('UserPage', {
  implements: [DaoNodePage],
})
export class UserPageType implements DaoNodePage<UserType> {
  @Field(() => [UserType], { description: 'Nodes in this page' })
  nodes!: UserType[];
}
`);
    });

    it('should generate "UserPageArgs" class', () => {
      expect(tree.readContent('/users/args/user-page.args.ts'))
        .toEqual(`import { DaoNodePageArgs } from '@app/graphql-type/args/dao-node-page.args';
import { ArgsType, Field } from '@nestjs/graphql';

import { UserOrderInput } from '../input/user-order.input';
import { UserWhereInput } from '../input/user-where.input';

@ArgsType()
export class UserPageArgs extends DaoNodePageArgs {
  @Field(() => UserOrderInput, {
    description: '排序欄位與方式',
    defaultValue: new UserOrderInput(),
  })
  order: UserOrderInput = new UserOrderInput();

  @Field(() => UserWhereInput, {
    description: '查詢條件',
    defaultValue: new UserWhereInput(),
  })
  where: UserWhereInput = new UserWhereInput();
}
`);
    });

    it('should generate "UserOrderInput" class', () => {
      expect(tree.readContent('/users/input/user-order.input.ts'))
        .toEqual(`import {
  DaoNodeOrderInput,
  DaoNodeOrderValue,
} from '@app/graphql-type/input/dao-node-order.input';
import { Field, InputType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

@InputType()
export class UserOrderInput extends DaoNodeOrderInput {
  @Field(() => DaoNodeOrderValue, { nullable: true })
  exampleField?: Maybe<DaoNodeOrderValue>;
}
`);
    });

    it('should generate "UserWhereInput" class', () => {
      expect(tree.readContent('/users/input/user-where.input.ts'))
        .toEqual(`import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UserWhereInput {
  @Field(() => ID, { description: 'Example field' })
  id!: string;
}
`);
    });

    it('should generate "CreateUserInput" class', () => {
      expect(tree.readContent('/users/input/create-user.input.ts'))
        .toEqual(`import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => ID, { description: 'Example field' })
  id!: string;
}
`);
    });

    it('should generate "UpdateUserInput" class', () => {
      expect(tree.readContent('/users/input/update-user.input.ts'))
        .toEqual(`import { Field, ID, InputType, PartialType } from '@nestjs/graphql';

import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(
  CreateUserInput,
) {
  @Field(() => ID)
  id!: string;
}
`);
    });

    it('should generate "UsersResolver" spec file', () => {
      expect(tree.readContent('/users/users.resolver.spec.ts'))
        .toEqual(`import { Test, TestingModule } from '@nestjs/testing';

import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

describe('UsersResolver', () => {
  let resolver: UsersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersResolver, UsersService],
    }).compile();

    resolver = module.get<UsersResolver>(
      UsersResolver,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
`);
    });

    it('should generate "UsersService" spec file', () => {
      expect(tree.readContent('/users/users.service.spec.ts'))
        .toEqual(`import { Test, TestingModule } from '@nestjs/testing';

import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(
      UsersService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
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

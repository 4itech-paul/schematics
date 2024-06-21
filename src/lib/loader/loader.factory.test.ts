import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { DomainOptions } from './loader.schema';

describe('Loader Factory', () => {
  const runner: SchematicTestRunner = new SchematicTestRunner(
    '.',
    path.join(process.cwd(), 'src/collection.json'),
  );

  describe('[GraphQL - Code first]', () => {
    it('should generate appropriate files ', async () => {
      const options: DomainOptions = {
        name: 'loader-0001',
        by: 'loader-0002',
        crud: true,
        type: 'graphql-code-first',
      };
      const tree = await runner.runSchematic('loader', options);
      const files = tree.files;
      expect(files).toEqual([
        '/loader-0001/loader-0001-by-id.loader.ts',
        '/loader-0001/loader-0001-by-id.resolver.ts',
        '/loader-0001/query/loader-0001-by-id.type.ts',
      ]);
    });
  });
  describe('[GraphQL - Code first]', () => {
    const options: DomainOptions = {
      name: 'loader-0001',
      by: 'loader-0002',
      crud: true,
      type: 'graphql-code-first',
    };

    let tree: UnitTestTree;

    beforeAll(async () => {
      tree = await runner.runSchematic('loader', options);
    });

    it('should generate "Domain0001ByIdLoader" class', () => {
      expect(tree.readContent('/loader-0001/loader-0001-by-id.loader.ts'))
        .toEqual(`import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { Maybe } from 'graphql/jsutils/Maybe';
import { In, Repository } from 'typeorm';

import { Domain0001 } from './loader-0001.entity';

@Injectable({ scope: Scope.REQUEST })
export class Domain0001ByIdLoader extends DataLoader<
  string,
  Maybe<Domain0001>
> {
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

    it('should generate "Domain0001ByIdResolver" class', () => {
      expect(tree.readContent('/loader-0001/loader-0001-by-id.resolver.ts'))
        .toEqual(`import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0001ByIdLoader } from './loader-0001-by-id.loader';
import { Domain0001 } from './loader-0001.entity';
import { Domain0001ById } from './query/loader-0001-by-id.type';

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

    it('should generate "Domain0001ById" class', () => {
      expect(tree.readContent('/loader-0001/query/loader-0001-by-id.type.ts'))
        .toEqual(`import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0010 } from '../domain-0010.entity';

@InterfaceType()
export abstract class Domain0010sByDomain0009Id {
  @Field(() => ID)
  id!: string;

  @Field(() => [Domain0010], { nullable: true })
  domain0010s?: Maybe<Domain0010[]>;
}
`);
    });
  });
});

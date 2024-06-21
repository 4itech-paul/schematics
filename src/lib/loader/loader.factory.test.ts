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
        name: 'domain-0002s',
        by: 'domain-0001-id',
      };
      const tree = await runner.runSchematic('loader', options);
      const files = tree.files;
      expect(files).toEqual([
        '/domain-0002s/domain-0002s-by-domain-0001-id.loader.ts',
        '/domain-0002s/domain-0002s-by-domain-0001-id.resolver.ts',
        '/domain-0002s/query/domain-0002s-by-domain-0001-id.type.ts',
      ]);
    });
  });
  describe('[GraphQL - Code first]', () => {
    const options: DomainOptions = {
      name: 'domain-0002s',
      by: 'domain-0001-id',
    };

    let tree: UnitTestTree;

    beforeAll(async () => {
      tree = await runner.runSchematic('loader', options);
    });

    it('should generate "Domain0001ByIdLoader" class', () => {
      expect(tree.readContent('/domain-0002s/domain-0002s-by-domain-0001-id.loader.ts'))
        .toEqual(`import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { Maybe } from 'graphql/jsutils/Maybe';
import { In } from 'typeorm';

import { Domain0002 } from './domain-0002.entity';
import { Domain0002Repository } from './domain-0002.repository';

@Injectable({ scope: Scope.REQUEST })
export class Domain0002sByDomain0001IdLoader extends DataLoader<
  string,
  Maybe<Domain0002[]>
> {
  constructor(private readonly repo: Domain0002Repository) {
    super(async (keys: readonly string[]): Promise<Maybe<Domain0002[]>[]> => {
      const daoArray = await this.repo.find({
        where: {
          domain0001Id: In(keys),
        },
      });
      return keys.map((key) =>
        daoArray.filter((dao) => key === dao.domain0001Id),
      );
    });
  }
}
`);
    });

    it('should generate "Domain0001ByIdResolver" class', () => {
      expect(tree.readContent('/domain-0002s/domain-0002s-by-domain-0001-id.resolver.ts'))
        .toEqual(`import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0002 } from './domain-0002.entity';
import { Domain0002sByDomain0001IdLoader } from './domain-0002s-by-domain-0001-id.loader';
import { Domain0002sByDomain0001Id } from './query/domain-0002s-by-domain-0001-id.type';

@Resolver(() => Domain0002sByDomain0001Id)
export class Domain0002sByDomain0001IdResolver {
  constructor(private readonly loader: Domain0002sByDomain0001IdLoader) {}

  @ResolveField(() => [Domain0002], { nullable: true })
  async domain0002s(
    @Parent() { id, domain0002s }: Domain0002sByDomain0001Id,
  ): Promise<Maybe<Domain0002[]>> {
    if (domain0002s) return domain0002s;
    return this.loader.load(id);
  }
}
`);
    });

    it('should generate "Domain0001ById" class', () => {
      expect(tree.readContent('/domain-0002s/query/domain-0002s-by-domain-0001-id.type.ts'))
        .toEqual(`import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0002 } from '../domain-0002.entity';

@InterfaceType()
export abstract class Domain0002sByDomain0001Id {
  @Field(() => ID)
  id!: string;

  @Field(() => [Domain0002], { nullable: true })
  domain0002s?: Maybe<Domain0002[]>;
}
`);
    });
  });
});

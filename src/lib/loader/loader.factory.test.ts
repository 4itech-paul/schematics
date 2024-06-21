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

import { Domain0010 } from './domain-0010.entity';
import { Domain0010Repository } from './domain-0010.repository';

@Injectable({ scope: Scope.REQUEST })
export class Domain0010sByDomain0009IdLoader extends DataLoader<
  string,
  Maybe<Domain0010[]>
> {
  constructor(private readonly repo: Domain0010Repository) {
    super(async (keys: readonly string[]): Promise<Maybe<Domain0010[]>[]> => {
      const daoArray = await this.repo.find({
        where: {
          domain0009Id: In(keys),
        },
      });
      return keys.map((key) =>
        daoArray.filter((dao) => key === dao.domain0009Id),
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

import { Domain0010 } from './domain-0010.entity';
import { Domain0010sByDomain0009IdLoader } from './domain-0010s-by-domain-0009-id.loader';
import { Domain0010sByDomain0009Id } from './query/domain-0010s-by-domain-0009-id.type';

@Resolver(() => Domain0010sByDomain0009Id)
export class Domain0010sByDomain0009IdResolver {
  constructor(private readonly loader: Domain0010sByDomain0009IdLoader) {}

  @ResolveField(() => [Domain0010], { nullable: true })
  async domain0010s(
    @Parent() { id, domain0010s }: Domain0010sByDomain0009Id,
  ): Promise<Maybe<Domain0010[]>> {
    if (domain0010s) return domain0010s;
    return this.loader.load(id);
  }
}
`);
    });

    it('should generate "Domain0001ById" class', () => {
      expect(tree.readContent('/domain-0002s/query/domain-0002s-by-domain-0001-id.type.ts'))
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

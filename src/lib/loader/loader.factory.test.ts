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
        name: 'domain-02s-by-domain-01-id',
        path: 'domain-02s'
      };
      const tree = await runner.runSchematic('loader', options);
      const files = tree.files;
      expect(files).toEqual([
        '/domain-02s/domain-02s-by-domain-01-id.loader.ts',
        '/domain-02s/domain-02s-by-domain-01-id.resolver.ts',
        '/domain-02s/query/domain-02s-by-domain-01-id.type.ts',
      ]);
    });
  });
  describe('[GraphQL - Code first]', () => {
    const options: DomainOptions = {
      name: 'domain-02s-by-domain-01-id',
      path: 'domain-02s'
    };

    let tree: UnitTestTree;

    beforeAll(async () => {
      tree = await runner.runSchematic('loader', options);
    });

    it('should generate "Domain01ByIdLoader" class', () => {
      expect(tree.readContent('/domain-02s/domain-02s-by-domain-01-id.loader.ts'))
        .toEqual(`import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { Maybe } from 'graphql/jsutils/Maybe';
import { In } from 'typeorm';

import { Domain02 } from './domain-02.entity';
import { Domain02Repository } from './domain-02.repository';

@Injectable({ scope: Scope.REQUEST })
export class Domain02sByDomain01IdLoader extends DataLoader<
  string,
  Maybe<Domain02[]>
> {
  constructor(private readonly repo: Domain02Repository) {
    super(async (keys: readonly string[]): Promise<Maybe<Domain02[]>[]> => {
      const daoArray = await this.repo.find({
        where: {
          domain01Id: In(keys),
        },
      });
      return keys.map((key) =>
        daoArray.filter((dao) => key === dao.domain01Id),
      );
    });
  }
}
`);
    });

    it('should generate "Domain01ByIdResolver" class', () => {
      expect(tree.readContent('/domain-02s/domain-02s-by-domain-01-id.resolver.ts'))
        .toEqual(`import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain02 } from './domain-02.entity';
import { Domain02sByDomain01IdLoader } from './domain-02s-by-domain-01-id.loader';
import { Domain02sByDomain01Id } from './query/domain-02s-by-domain-01-id.type';

@Resolver(() => Domain02sByDomain01Id)
export class Domain02sByDomain01IdResolver {
  constructor(private readonly loader: Domain02sByDomain01IdLoader) {}

  @ResolveField(() => [Domain02], { nullable: true })
  async domain02s(
    @Parent() { id, domain02s }: Domain02sByDomain01Id,
  ): Promise<Maybe<Domain02[]>> {
    if (domain02s) return domain02s;
    return this.loader.load(id);
  }
}
`);
    });

    it('should generate "Domain01ById" class', () => {
      expect(tree.readContent('/domain-02s/query/domain-02s-by-domain-01-id.type.ts'))
        .toEqual(`import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain02 } from '../domain-02.entity';

@InterfaceType()
export abstract class Domain02sByDomain01Id {
  @Field(() => ID)
  id!: string;

  @Field(() => [Domain02], { nullable: true })
  domain02s?: Maybe<Domain02[]>;
}
`);
    });
  });
});

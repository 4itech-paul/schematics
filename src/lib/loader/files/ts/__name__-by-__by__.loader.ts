import { Injectable, Scope } from '@nestjs/common';
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

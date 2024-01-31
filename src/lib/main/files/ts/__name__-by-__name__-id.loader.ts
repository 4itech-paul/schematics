// user-loader.service.ts
import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { Maybe } from 'graphql/jsutils/Maybe';
import { In, Repository } from 'typeorm';

import { <%= classify(singular(name)) %> } from './<%= singular(name) %>.entity';

@Injectable({ scope: Scope.REQUEST })
export class <%= classify(singular(name)) %>By<%= classify(singular(name)) %>IdLoader extends DataLoader<
  string,
  Maybe<<%= classify(singular(name)) %>>
> {
  constructor(
    @InjectRepository(<%= classify(singular(name)) %>)
    private readonly repo: Repository<<%= classify(singular(name)) %>>,
  ) {
    super(async (keys: readonly string[]): Promise<Maybe<<%= classify(singular(name)) %>>[]> => {
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

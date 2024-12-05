import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { Maybe } from 'graphql/jsutils/Maybe';
import { In } from 'typeorm';

import { <%= classify(singular(name)) %> } from './<%= singular(name) %>.entity';
import { <%= classify(singular(name)) %>Repository } from './<%= singular(name) %>.repository';

@Injectable({ scope: Scope.REQUEST })
export class <%= classify(singular(name)) %>By<%= classify(singular(name)) %>IdLoader extends DataLoader<string, Maybe<<%= classify(singular(name)) %>>> {
  constructor(private readonly repo: <%= classify(singular(name)) %>Repository) {
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

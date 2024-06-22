import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { Maybe } from 'graphql/jsutils/Maybe';
import { In } from 'typeorm';

import { <%= classify(singular(entities)) %> } from './<%= singular(entities) %>.entity';
import { <%= classify(singular(entities)) %>Repository } from './<%= singular(entities) %>.repository';

@Injectable({ scope: Scope.REQUEST })
export class <%= classify(entities) %>By<%= classify(by) %>Loader extends DataLoader<
  string,
  Maybe<<%= classify(singular(entities)) %>[]>
> {
  constructor(private readonly repo: <%= classify(singular(entities)) %>Repository) {
    super(async (keys: readonly string[]): Promise<Maybe<<%= classify(singular(entities)) %>[]>[]> => {
      const daoArray = await this.repo.find({
        where: {
          <%= lowercased(by) %>: In(keys),
        },
      });
      return keys.map((key) =>
        daoArray.filter((dao) => key === dao.<%= lowercased(by) %>),
      );
    });
  }
}

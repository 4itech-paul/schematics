import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { Maybe } from 'graphql/jsutils/Maybe';
import { In } from 'typeorm';

import { <%= classify(singular(name)) %> } from './<%= singular(name) %>.entity';
import { <%= classify(singular(name)) %>Repository } from './<%= singular(name) %>.repository';

@Injectable({ scope: Scope.REQUEST })
export class <%= classify(name) %>By<%= classify(by) %>Loader extends DataLoader<
  string,
  Maybe<<%= classify(singular(name)) %>[]>
> {
  constructor(private readonly repo: <%= classify(singular(name)) %>Repository) {
    super(async (keys: readonly string[]): Promise<Maybe<<%= classify(singular(name)) %>[]>[]> => {
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

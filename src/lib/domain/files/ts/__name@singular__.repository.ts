import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { BaseRepository } from '../common/base.repository';
import { <%= classify(singular(name)) %> } from './<%= singular(name) %>.entity';

@Injectable()
export class <%= classify(singular(name)) %>Repository extends BaseRepository<<%= classify(singular(name)) %>> {
  constructor(readonly manager: EntityManager) {
    super(<%= classify(singular(name)) %>, manager);
  }
}

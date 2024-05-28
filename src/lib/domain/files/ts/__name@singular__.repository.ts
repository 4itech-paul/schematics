import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseRepository } from '../common/base.repository';
import { <%= classify(singular(name)) %> } from './<%= singular(name) %>.entity';

@Injectable()
export class <%= classify(singular(name)) %>Repository extends BaseRepository<<%= classify(singular(name)) %>> {
  constructor(
    @InjectRepository(<%= classify(singular(name)) %>)
    readonly repo: Repository<<%= classify(singular(name)) %>>,
  ) {
    super(repo);
  }
}

import { ObjectType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Entity } from 'typeorm';

import { ColumnField } from '../common/column-field.decorator';
import { MetaEntity } from '../common/meta.entity';

@Entity()
@ObjectType({ implements: [MetaEntity] })
export class <%= classify(singular(name)) %> extends MetaEntity {
  @ColumnField({ type: 'int', nullable: true, comment: '<%= lowercased(singular(name)) %>001' })
  <%= lowercased(singular(name)) %>001?: Maybe<number>;
}

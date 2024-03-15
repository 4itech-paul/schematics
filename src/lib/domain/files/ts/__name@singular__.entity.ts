import { ObjectType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { ColumnField } from 'src/common/column-field.decorator';
import { MetaEntity } from 'src/common/meta.entity';
import { Entity } from 'typeorm';

@Entity()
@ObjectType({ implements: MetaEntity })
export class <%= classify(singular(name)) %> extends MetaEntity {
  @ColumnField({ type: 'int', nullable: true, comment: '<%= lowercased(singular(name)) %>001' })
  <%= lowercased(singular(name)) %>001?: Maybe<number>;
}

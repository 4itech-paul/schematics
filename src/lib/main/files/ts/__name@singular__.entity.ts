import { CustomBaseEntity } from '@app/db/entity/custom-base.entity';
import { VarcharLength } from '@app/enum/varchar-length.enum';
import { ColumnField } from '@app/util/column-field.decorator';
import { ObjectType } from '@nestjs/graphql';
import { MainDaoNode } from 'apps/main/src/common/main-dao-node.type';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Entity } from 'typeorm';

@ObjectType({ implements: [MainDaoNode] })
@Entity()
export class <%= singular(classify(name)) %> extends CustomBaseEntity {
  @ColumnField({
    type: 'varchar',
    length: VarcharLength.Short,
    comment: '',
    nullable: true,
  })
  exampleField?: Maybe<string>;
}

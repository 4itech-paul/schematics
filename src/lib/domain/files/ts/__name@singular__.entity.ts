import { Field, ObjectType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { MetaEntity } from 'src/common/meta.entity';
import { Column, Entity } from 'typeorm';

@ObjectType({ implements: MetaEntity })
@Entity()
export class <%= classify(singular(name)) %> extends MetaEntity {
  @Field(() => String, { description: '#', nullable: true })
  @Column({
    type: 'varchar',
    length: 10,
    comment: '#',
    nullable: true,
  })
  exampleField?: Maybe<string>;
}

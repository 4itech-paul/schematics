import { InputType } from '@nestjs/graphql';
import { OmitMetaEntityType } from 'src/common/omit-meta-entity-type';

import { <%= classify(singular(name)) %> } from '../<%= singular(name) %>.entity';

@InputType()
export class Create<%= classify(singular(name)) %>Input extends OmitMetaEntityType(
  <%= classify(singular(name)) %>,
  [] as const,
) {}

import { ToCreateInputType } from '@app/graphql-type/to-create-input-type';
import { InputType, OmitType } from '@nestjs/graphql';

import { <%= classify(singular(name)) %> } from '../<%= singular(name) %>.entity';

@InputType()
export class Create<%= classify(singular(name)) %>Input extends OmitType(
  ToCreateInputType(<%= classify(singular(name)) %>),
  [],
) {}

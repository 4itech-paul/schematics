import { InputType, OmitType } from '@nestjs/graphql';

import { ToCreateInputType } from '../../common/to-create-input-type';
import { <%= classify(singular(name)) %> } from '../<%= singular(name) %>.entity';

@InputType()
export class Create<%= classify(singular(name)) %>Input extends OmitType(
  ToCreateInputType(<%= classify(singular(name)) %>),
  [],
) {}

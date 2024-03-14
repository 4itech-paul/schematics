import { ToOrderInputType } from '@app/graphql-type/to-order-input-type';
import { InputType, OmitType } from '@nestjs/graphql';

import { <%= classify(singular(name)) %> } from '../<%= singular(name) %>.entity';

@InputType()
export class <%= classify(singular(name)) %>OrderInput extends OmitType(
  ToOrderInputType(<%= classify(singular(name)) %>),
  [],
) {}

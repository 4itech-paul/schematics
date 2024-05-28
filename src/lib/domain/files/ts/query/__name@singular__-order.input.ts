import { InputType, OmitType } from '@nestjs/graphql';

import { ToOrderInputType } from '../../common/to-order-input-type';
import { <%= classify(singular(name)) %> } from '../<%= singular(name) %>.entity';

@InputType()
export class <%= classify(singular(name)) %>OrderInput extends OmitType(
  ToOrderInputType(<%= classify(singular(name)) %>),
  [],
) {}

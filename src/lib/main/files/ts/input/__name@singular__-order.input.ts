import { ToOrderInputType } from '@app/graphql-type/to-order-input-type';
import { InputType } from '@nestjs/graphql';

import { <%= classify(singular(name)) %> } from '../<%= singular(name) %>.entity';

@InputType()
export class <%= classify(singular(name)) %>OrderInput extends ToOrderInputType(<%= classify(singular(name)) %>) {}

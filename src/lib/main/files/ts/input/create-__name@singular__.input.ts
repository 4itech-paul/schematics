import { ToCreateInputType } from '@app/graphql-type/to-create-input-type';
import { InputType } from '@nestjs/graphql';

import { <%= singular(classify(name)) %> } from '../<%= singular(name) %>.entity';

@InputType()
export class Create<%= singular(classify(name)) %>Input extends ToCreateInputType(<%= singular(classify(name)) %>) {}

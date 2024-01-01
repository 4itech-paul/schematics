import { OmitMetaEntityType } from '@app/graphql-type/omit-meta-entity-type';
import { InputType } from '@nestjs/graphql';

import { <%= singular(classify(name)) %> } from '../<%= singular(name) %>.entity';

@InputType()
export class Create<%= singular(classify(name)) %>Input extends OmitMetaEntityType(<%= singular(classify(name)) %>, [] as const) {}

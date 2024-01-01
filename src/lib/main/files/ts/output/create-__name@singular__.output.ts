<% if (type === 'graphql-code-first') { %>import { Field, ObjectType } from '@nestjs/graphql';

import { <%= singular(classify(name)) %> } from '../<%= singular(name) %>.entity';

@ObjectType()
export class Create<%= singular(classify(name)) %>Output {
  @Field(() => <%= singular(classify(name)) %>)
  <%= singular(lowercased(name)) %>!: <%= singular(classify(name)) %>;
}<% } else { %>export class <%= singular(classify(name)) %>Output {}<% } %>

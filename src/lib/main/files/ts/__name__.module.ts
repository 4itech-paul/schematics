import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { <%= classify(singular(name)) %> } from './<%= singular(name) %>.entity';
import { <%= classify(singular(name)) %>Resolver } from './<%= singular(name) %>.resolver';
import { <%= classify(singular(name)) %>Service } from './<%= singular(name) %>.service';

@Module({
  imports: [TypeOrmModule.forFeature([<%= classify(singular(name)) %>])],
  providers: [
    <%= classify(singular(name)) %>Resolver,
    <%= classify(singular(name)) %>Service,
    // <%= classify(singular(name)) %>By<%= classify(singular(name)) %>IdLoader,
    // With<%= classify(singular(name)) %>Resolver,
  ],
})
export class <%= classify(singular(name)) %>Module {}

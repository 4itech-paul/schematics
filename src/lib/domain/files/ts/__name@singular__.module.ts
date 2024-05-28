import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { <%= classify(singular(name)) %> } from './<%= singular(name) %>.entity';
import { <%= classify(singular(name)) %>Repository } from './<%= singular(name) %>.repository';
import { <%= classify(singular(name)) %>Resolver } from './<%= singular(name) %>.resolver';
import { <%= classify(singular(name)) %>Service } from './<%= singular(name) %>.service';

@Module({
  imports: [TypeOrmModule.forFeature([<%= classify(singular(name)) %>])],
  providers: [
    <%= classify(singular(name)) %>Repository,
    <%= classify(singular(name)) %>Service,
    <%= classify(singular(name)) %>Resolver,
    // <%= classify(singular(name)) %>ByIdLoader,
    // <%= classify(singular(name)) %>ByIdResolver,
  ],
})
export class <%= classify(singular(name)) %>Module {}

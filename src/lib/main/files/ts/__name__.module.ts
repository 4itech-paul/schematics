import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { <%= singular(classify(name)) %> } from './<%= singular(name) %>.entity';
import { <%= singular(classify(name)) %>Resolver } from './<%= singular(name) %>.resolver';
import { <%= singular(classify(name)) %>Service } from './<%= singular(name) %>.service';

@Module({
  imports: [TypeOrmModule.forFeature([<%= singular(classify(name)) %>])],
  providers: [<%= singular(classify(name)) %>Resolver, <%= singular(classify(name)) %>Service],
})
export class <%= singular(classify(name)) %>Module {}

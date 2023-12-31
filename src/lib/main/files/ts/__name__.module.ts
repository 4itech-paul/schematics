import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { <%= singular(classify(name)) %> } from './<%= singular(lowercased(name)) %>.entity';
import { <%= singular(classify(name)) %>Resolver } from './<%= singular(lowercased(name)) %>.resolver';
import { <%= singular(classify(name)) %>Service } from './<%= singular(lowercased(name)) %>.service';

@Module({
  imports: [TypeOrmModule.forFeature([<%= singular(classify(name)) %>])],
  providers: [<%= singular(classify(name)) %>Resolver, <%= singular(classify(name)) %>Service],
})
export class <%= singular(classify(name)) %>Module {}

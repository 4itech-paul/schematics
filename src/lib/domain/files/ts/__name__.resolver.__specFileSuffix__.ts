import { Test, TestingModule } from '@nestjs/testing';

import { <%= classify(singular(name)) %>Resolver } from './<%= singular(name) %>.resolver';
import { <%= classify(singular(name)) %>Service } from './<%= singular(name) %>.service';

describe('<%= classify(singular(name)) %>Resolver', () => {
  let resolver: <%= classify(singular(name)) %>Resolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [<%= classify(singular(name)) %>Resolver, <%= classify(singular(name)) %>Service],
    })
      .useMocker(() => ({}))
      .compile();

    resolver = module.get<<%= classify(singular(name)) %>Resolver>(<%= classify(singular(name)) %>Resolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

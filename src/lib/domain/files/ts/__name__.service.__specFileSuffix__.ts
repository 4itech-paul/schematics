import { Test, TestingModule } from '@nestjs/testing';

import { <%= classify(singular(name)) %>Service } from './<%= singular(name) %>.service';

describe('<%= classify(singular(name)) %>Service', () => {
  let service: <%= classify(singular(name)) %>Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [<%= classify(singular(name)) %>Service],
    })
      .useMocker(() => ({}))
      .compile();

    service = module.get<<%= classify(singular(name)) %>Service>(<%= classify(singular(name)) %>Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

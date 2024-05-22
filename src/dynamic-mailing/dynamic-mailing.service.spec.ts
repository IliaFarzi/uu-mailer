import { Test, TestingModule } from '@nestjs/testing';
import { DynamicMailingService } from './dynamic-mailing.service';

describe('DynamicMailingService', () => {
  let service: DynamicMailingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DynamicMailingService],
    }).compile();

    service = module.get<DynamicMailingService>(DynamicMailingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

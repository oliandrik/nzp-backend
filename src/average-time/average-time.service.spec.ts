import { Test, TestingModule } from '@nestjs/testing';
import { AverageTimeService } from './average-time.service';

describe('AverageTimeService', () => {
  let service: AverageTimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AverageTimeService],
    }).compile();

    service = module.get<AverageTimeService>(AverageTimeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

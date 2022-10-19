import { Test, TestingModule } from '@nestjs/testing';
import { AverageTimeController } from './average-time.controller';
import { AverageTimeService } from './average-time.service';

describe('AverageTimeController', () => {
  let controller: AverageTimeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AverageTimeController],
      providers: [AverageTimeService],
    }).compile();

    controller = module.get<AverageTimeController>(AverageTimeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

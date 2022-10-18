import { Test, TestingModule } from '@nestjs/testing';
import { GeneralSettingsController } from './general-settings.controller';
import { GeneralSettingsService } from './general-settings.service';

describe('GeneralSettingsController', () => {
  let controller: GeneralSettingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeneralSettingsController],
      providers: [GeneralSettingsService],
    }).compile();

    controller = module.get<GeneralSettingsController>(
      GeneralSettingsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

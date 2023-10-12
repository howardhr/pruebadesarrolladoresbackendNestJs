import { Test, TestingModule } from '@nestjs/testing';
import { AdminimgController } from './adminimg.controller';

describe('AdminimgController', () => {
  let controller: AdminimgController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminimgController],
    }).compile();

    controller = module.get<AdminimgController>(AdminimgController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

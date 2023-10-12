import { Test, TestingModule } from '@nestjs/testing';
import { AdminimgService } from './adminimg.service';

describe('AdminimgService', () => {
  let service: AdminimgService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminimgService],
    }).compile();

    service = module.get<AdminimgService>(AdminimgService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

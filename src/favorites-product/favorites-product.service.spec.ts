import { Test, TestingModule } from '@nestjs/testing';
import { FavoritesProductService } from './favorites-product.service';

describe('FavoritesProductService', () => {
  let service: FavoritesProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavoritesProductService],
    }).compile();

    service = module.get<FavoritesProductService>(FavoritesProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

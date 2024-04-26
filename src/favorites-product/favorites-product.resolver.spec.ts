import { Test, TestingModule } from '@nestjs/testing';
import { FavoritesProductResolver } from './favorites-product.resolver';
import { FavoritesProductService } from './favorites-product.service';

describe('FavoritesProductResolver', () => {
  let resolver: FavoritesProductResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavoritesProductResolver, FavoritesProductService],
    }).compile();

    resolver = module.get<FavoritesProductResolver>(FavoritesProductResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

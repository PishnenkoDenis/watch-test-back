import { Args, Int, Query, Resolver } from '@nestjs/graphql';

import { FavoritesProduct } from './favorites-product.model';
import { FavoritesProductService } from './favorites-product.service';

@Resolver(() => FavoritesProduct)
export class FavoritesProductResolver {
  constructor(
    private readonly favoritesProductService: FavoritesProductService,
  ) {}

  @Query(() => [FavoritesProduct], { name: 'getFavoritesProduct' })
  async getFavoriteProductData(@Args('id', { type: () => Int }) id: number) {
    return await this.favoritesProductService.getFavoriteProductData(id);
  }
}

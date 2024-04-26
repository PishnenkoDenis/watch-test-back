import { Query, Resolver } from '@nestjs/graphql';

import { Product } from './product.model';
import { ProductService } from './product.service';

@Resolver()
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Query(() => [Product])
  async getNovelties(limit: number) {
    return await this.productService.getNovelties(limit);
  }
}

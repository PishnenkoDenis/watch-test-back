import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Shop } from 'src/models/shop.model';

import { CreateShopDto } from './dto/create-shop.dto';
import { ShopService } from './shop.service';

@Resolver()
export class ShopResolver {
  constructor(private shopService: ShopService) {}

  @Query(() => Shop)
  async getShope(
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<Shop> {
    return await this.shopService.get(userId);
  }

  @Mutation(() => Shop)
  async createShop(@Args('dto') dto: CreateShopDto): Promise<Shop> {
    return await this.shopService.create(dto);
  }

  @Mutation(() => Shop)
  async updateShop(
    @Args('dto') dto: CreateShopDto,
    @Args('shopId', { type: () => Int }) shopId: number,
  ) {
    return await this.shopService.update(shopId, dto);
  }

  @Mutation(() => Shop)
  async removeShop(@Args('shopId', { type: () => Int }) shopId: number) {
    await this.shopService.remove(shopId);

    return { shopId };
  }
}

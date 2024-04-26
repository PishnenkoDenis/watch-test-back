import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { serverResponseOK } from 'src/config';

import { Basket } from './basket.model';
import { BasketService } from './basket.service';
import { CreateBasketInput } from './dto/create-basket.input';

interface ResponseOk {
  success: boolean;
  message: any;
  statusCode: any;
}

@Resolver(() => Basket)
export class BasketResolver {
  constructor(private readonly basketService: BasketService) {}

  @Query(() => [Basket], { name: 'basket' })
  async getBasketData(@Args('userId', { type: () => Int }) userId: number) {
    return await this.basketService.getBasketData(userId);
  }

  @Mutation(() => Basket)
  async addToBasket(@Args('addItem') addItem: CreateBasketInput) {
    return await this.basketService.addToBasket(addItem);
  }

  @Mutation(() => Basket)
  async removeFromBasket(@Args('id') id: number): Promise<object> {
    await this.basketService.removeFromBasket(id);
    return { id };
  }
}

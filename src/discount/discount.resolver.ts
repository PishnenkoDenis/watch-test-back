import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Discount } from './discount.model';
import { DiscountService } from './discount.service';
import { CreateDiscountDto } from './dto/create-discount.dto';

@Resolver()
export class DiscountResolver {
  constructor(private discountService: DiscountService) {}

  @Mutation(() => Discount)
  async addDiscount(@Args('dto') dto: CreateDiscountDto): Promise<Discount> {
    return await this.discountService.create(dto);
  }

  @Query(() => [Discount])
  async getDiscounts(
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<Discount[]> {
    return await this.discountService.getAll(userId);
  }

  @Mutation(() => Discount)
  async deleteDiscount(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<object> {
    await this.discountService.remove(id);
    return { id };
  }

  @Mutation(() => Discount)
  async updateDiscount(
    @Args('dto') dto: CreateDiscountDto,
    @Args('id', { type: () => Int }) id: number,
  ) {
    return await this.discountService.update(id, dto);
  }
}

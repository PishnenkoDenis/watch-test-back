import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

import { CreateBasketInput } from './create-basket.input';

@InputType()
export class UpdateBasketInput extends PartialType(CreateBasketInput) {
  @Field(() => Int)
  id: number;
}

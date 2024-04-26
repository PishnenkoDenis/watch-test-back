import { CreateFavoritesProductInput } from './create-favorites-product.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFavoritesProductInput extends PartialType(CreateFavoritesProductInput) {
  @Field(() => Int)
  id: number;
}

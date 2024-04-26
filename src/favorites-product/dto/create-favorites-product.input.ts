import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFavoritesProductInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

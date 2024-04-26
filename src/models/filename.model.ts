import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Filename {
  @Field(() => String)
  filename: string;
}

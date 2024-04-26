import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class CreateBasketInput {
  @ApiProperty({ example: 1, description: 'User id' })
  @IsNotEmpty({ message: 'User id required' })
  @IsNumber()
  @Field(() => Int)
  readonly userId: number;

  @ApiProperty({ example: 1, description: 'Product id' })
  @IsNotEmpty({ message: 'Product id required' })
  @IsNumber()
  @Field(() => Int)
  readonly productId: number;
}

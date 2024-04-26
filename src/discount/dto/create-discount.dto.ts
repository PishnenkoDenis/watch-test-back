import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Max, MaxLength, Min } from 'class-validator';

@InputType()
export class CreateDiscountDto {
  @ApiProperty({ example: 'Discount 10', description: 'Discount name' })
  @IsNotEmpty({ message: 'Discount name required' })
  @IsString({ message: 'Discount name should be string' })
  @MaxLength(20, { message: 'Email is too long' })
  @Field(() => String)
  readonly discountName: string;

  @ApiProperty({ example: '10%', description: 'Discount procent' })
  @IsNotEmpty({ message: 'Procent required' })
  @Max(100, { message: 'Input value not more than 100' })
  @Field(() => Int)
  readonly percent: number;

  @ApiProperty({ example: '100', description: 'Discount condition' })
  @IsNotEmpty({ message: 'Condition required' })
  @Min(2, { message: 'Input value more than 1' })
  @Field(() => Int)
  readonly condition: number;

  @ApiProperty({ example: '1', description: 'User id' })
  @IsNotEmpty({ message: 'userId required' })
  @Field(() => Int)
  readonly userId: number;
}

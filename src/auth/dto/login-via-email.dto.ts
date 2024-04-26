import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

import { VALID_PASSWORD_REGEXP } from '../../config';

@InputType()
export class LoginViaEmailDto {
  @IsString({ message: 'Email should be string' })
  @MaxLength(255, { message: 'Email is too long' })
  @IsEmail({}, { message: 'Invalid email' })
  @Field(() => String)
  readonly email?: string;

  @IsPhoneNumber()
  @IsString({ message: 'Phone number should be string' })
  @Field(() => String, { nullable: true })
  readonly phone?: string;

  @IsNotEmpty({ message: 'Password required' })
  @IsString({ message: 'Password should be string' })
  @Matches(VALID_PASSWORD_REGEXP, { message: 'Invalid password' })
  @Field(() => String)
  readonly password: string;
}

import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  ValidateIf,
} from 'class-validator';
import { User } from 'src/users/user.model';

import { ERoles, VALID_PASSWORD_REGEXP } from '../../config';

@InputType()
export class CreateUserDto {
  @ApiProperty({
    example: 'jhon.doe@gmail.com',
    description: 'User email',
  })
  @IsString({ message: 'Email should be string' })
  @MaxLength(255, { message: 'Email is too long' })
  @IsNotEmpty({ message: 'Email required' })
  @IsEmail({}, { message: 'Invalid email' })
  @Field(() => String, { nullable: true })
  @IsOptional()
  readonly email?: string;

  @ApiProperty({ example: 'Jhon Doe', description: 'User full name' })
  @IsNotEmpty({ message: 'Full name required' })
  @IsString({ message: 'Invalid full name' })
  @MaxLength(255, { message: 'Full name is too long' })
  @Field(() => String)
  readonly fullName: string;

  @ApiProperty({ example: 'Password_1', description: 'User password' })
  @IsNotEmpty({ message: 'Password required' })
  @IsString({ message: 'Password should be string' })
  @Matches(VALID_PASSWORD_REGEXP, { message: 'Invalid password' })
  @Field(() => String)
  readonly password: string;

  @ApiProperty({
    example: '+1 900 999 99 99',
    description: 'User phone number. Ex.: +1 900 999 99 99',
  })
  @ValidateIf((user: User) => Boolean(user.email))
  @IsNotEmpty({ message: 'Phone required' })
  @IsOptional()
  @IsPhoneNumber()
  @IsString({ message: 'Phone number should be string' })
  @Field(() => String, { nullable: true })
  readonly phone?: string;

  @ApiPropertyOptional({
    description: `Admin birthday. Ex.: ${new Date('01.01.1970')}`,
  })
  @IsOptional()
  @Field(() => Date, { nullable: true })
  readonly birthday?: Date;

  @ApiPropertyOptional({
    description: `User role`,
  })
  @Field()
  readonly role: ERoles;
}

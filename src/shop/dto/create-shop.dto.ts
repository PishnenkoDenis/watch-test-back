import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { VALID_PASSWORD_REGEXP } from 'src/config';

import { NotificationsDto } from './notifications.dto';

@InputType()
export class CreateShopDto {
  @ApiProperty({ example: 'Password', description: 'New password' })
  @IsOptional()
  @IsString({ message: 'Password should be string' })
  @Matches(VALID_PASSWORD_REGEXP, { message: 'Invalid password' })
  @Field(() => String, { nullable: true })
  readonly newPassword?: string;

  @ApiProperty({ example: 'Password', description: 'Old password' })
  @IsOptional()
  @IsString({ message: 'Password should be string' })
  @Matches(VALID_PASSWORD_REGEXP, { message: 'Invalid password' })
  @Field(() => String, { nullable: true })
  readonly oldPassword?: string;

  @ApiProperty({ example: 'Wear shop', description: 'Shop name' })
  @IsNotEmpty({ message: 'Title required' })
  @IsString({ message: 'Title should be string' })
  @Field(() => String)
  readonly title: string;

  @ApiProperty({
    example: 'The store with a wide selection',
    description: 'Notification id',
  })
  @IsNotEmpty({ message: 'Description required' })
  @IsString({ message: 'Description should be string' })
  @Field(() => String)
  readonly description: string;

  @ApiProperty({ example: 'logo.png', description: 'Shop logo' })
  @IsOptional()
  @Field(() => GraphQLUpload, { nullable: true })
  readonly logo?: Promise<FileUpload>;

  @ApiProperty({ example: 1, description: 'Seller ID' })
  @Field(() => Int)
  readonly userId: number;

  @ApiProperty({ example: 'image.png', description: 'Shop wallpaper' })
  @IsOptional()
  @Field(() => GraphQLUpload, { nullable: true })
  readonly wallpaper: Promise<FileUpload>;

  @ApiProperty({
    example: '+7 (900) 122-10-22',
    description: 'Shop telephone number',
  })
  @IsNotEmpty({ message: 'Telephone number required' })
  @IsPhoneNumber()
  @Field(() => String)
  readonly telephone: string;

  @ApiProperty({ example: 'shop@gmail.com', description: 'Shop email' })
  @IsNotEmpty({ message: 'Email required' })
  @IsEmail({}, { message: 'Invalid email' })
  @Field(() => String)
  readonly email: string;

  @ApiProperty({ example: 'Kosmonavtov st. 22', description: 'Shop address' })
  @IsNotEmpty({ message: 'Address required' })
  @IsString({ message: 'Address should be string' })
  @Field(() => String)
  readonly address: string;

  @ApiProperty({ example: 'russian', description: 'Selected language' })
  @IsNotEmpty({ message: 'Language required' })
  @IsString({ message: 'Language should be string' })
  @Field(() => String)
  readonly language: string;

  @ApiProperty({ example: 'russian ruble', description: 'Currency' })
  @IsNotEmpty({ message: 'Currency required' })
  @IsString({ message: 'Currency should be string' })
  @Field(() => String)
  readonly currency: string;

  @ApiProperty({ example: 'OOO "Store"', description: 'Legal entity name' })
  @IsNotEmpty({ message: 'Legal Entity required' })
  @IsString({ message: 'Legal entity should be string' })
  @Field(() => String)
  readonly legalEntity: string;

  @ApiProperty({ example: '2202022422', description: 'INN' })
  @IsNotEmpty({ message: 'INN required' })
  @MinLength(10)
  @Field(() => String)
  readonly inn: string;

  @ApiProperty({ example: '220202242', description: 'KPP' })
  @IsNotEmpty({ message: 'KPP required' })
  @MinLength(9)
  @Field(() => String)
  readonly kpp: string;

  @ApiProperty({ example: 'Kosmonavtov st. 22', description: 'Legal address' })
  @IsNotEmpty({ message: 'Legal address required' })
  @IsString({ message: 'Legal address should be string' })
  @Field(() => String)
  readonly legalAddress: string;

  @ApiProperty({ example: 'Sberbank', description: 'The name of the bank' })
  @IsNotEmpty({ message: 'Bank required' })
  @IsString({ message: 'Bank name should be string' })
  @Field(() => String)
  readonly bank: string;

  @ApiProperty({ example: '220202242', description: 'BIK' })
  @IsNotEmpty({ message: 'BIK required' })
  @MinLength(9)
  @Field(() => String)
  readonly bik: string;

  @ApiProperty({
    example: '22134256789123445436',
    description: 'Checking account',
  })
  @IsNotEmpty({ message: 'Checking account required' })
  @MinLength(20)
  @Field(() => String)
  readonly checkAccount: string;

  @ApiProperty({ example: '22134256789123445436', description: 'Corp account' })
  @IsNotEmpty({ message: 'Corp account required' })
  @MinLength(20)
  @Field(() => String)
  readonly corpAccount: string;

  @ApiProperty({
    description: 'Notifications',
  })
  @IsOptional()
  @Field(() => [NotificationsDto])
  readonly notifications: NotificationsDto[];
}

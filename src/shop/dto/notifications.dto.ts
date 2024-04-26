import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class NotificationsDto {
  @ApiProperty({ example: 'email', description: 'Notification type' })
  @IsNotEmpty({ message: 'Type required' })
  @IsString({ message: 'Type should be string' })
  @IsOptional()
  @Field(() => String)
  readonly type?: string;

  @ApiProperty({ example: 'messages', description: 'Notification resource' })
  @IsNotEmpty({ message: 'Resource required' })
  @IsString({ message: 'Resource should be string' })
  @IsOptional()
  @Field(() => String)
  readonly resource?: string;

  @ApiProperty({ example: true, description: 'Notification state' })
  @IsNotEmpty({ message: 'isActive required' })
  @IsOptional()
  @Field(() => Boolean)
  readonly is_active?: boolean;
}

import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { Shop } from './shop.model';

interface NotificationCreateAttributes {
  type?: string;
  resource?: string;
  is_active?: boolean;
  shopId: number;
}

@ObjectType()
@Table({ tableName: 'notifications' })
export class Notifications extends Model<
  Notifications,
  NotificationCreateAttributes
> {
  @ApiProperty({ example: 1, description: 'Notification id' })
  @Field(() => Int)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'email', description: 'Notification type' })
  @Field(() => String, { nullable: true })
  @Column({
    type: DataType.ENUM({ values: ['Email', 'Phone', 'Push'] }),
    allowNull: true,
    field: 'type',
  })
  type?: string;

  @ApiProperty({ example: 'news', description: 'Notification resource' })
  @Field(() => String, { nullable: true })
  @Column({
    type: DataType.ENUM({ values: ['messages', 'news', 'orders'] }),
    allowNull: true,
    field: 'resource',
  })
  resource?: string;

  @ApiProperty({ example: true, description: 'Notification state' })
  @Field(() => Boolean, { nullable: true })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    field: 'is_active',
  })
  is_active?: boolean;

  @ApiProperty({ example: 1, description: 'Shop ID' })
  @Field(() => Int)
  @ForeignKey(() => Shop)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'shop_id',
  })
  shopId: number;

  @BelongsTo(() => Shop)
  shop: Shop;
}

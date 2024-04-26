import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Basket } from 'src/basket/basket.model';
import { ERoles } from 'src/config';

import { FavoritesProduct } from '../favorites-product/favorites-product.model';
import { BrowsingHistory } from '../models/browsing-history.model';
import { Comment } from '../models/comment.model';
import { DeliveryAddress } from '../models/delivery-address.model';
import { FavoritesShop } from '../models/favorites-shop.model';
import { Order } from '../models/order.model';
import { PurchaseHistory } from '../models/purchase-history.model';
import { Shop } from '../models/shop.model';
import { Password } from './password.model';
import { RefreshToken } from './refresh-token.model';

interface UserCreationAttributes {
  fullName: string;
  email: string;
  birthday?: Date;
  phone?: string;
  avatar?: string;
  role: ERoles;
  address?: string;
}

@ObjectType()
@Table({ tableName: 'user' })
export class User extends Model<User, UserCreationAttributes> {
  @ApiProperty({ example: 1, description: 'User id' })
  @Field(() => Int)
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Ivan Ivanov', description: 'User full name' })
  @Field(() => String)
  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    field: 'full_name',
  })
  fullName: string;

  @ApiProperty({ example: 'ivan.ivanov@gmail.com', description: 'User email' })
  @Field(() => String, { nullable: true })
  @Column({
    type: DataType.STRING,
    allowNull: true,
    validate: {
      isEmail: true,
    },
    unique: true,
    field: 'email',
  })
  email?: string;

  @Field(() => Date, { nullable: true })
  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: 'birthday',
  })
  birthday?: Date;

  @ApiProperty({
    example: '+1 999 88-77-666',
    description: 'User phone number',
  })
  @Field(() => String, { nullable: true })
  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: '',
    field: 'phone',
  })
  phone?: string;

  @ApiProperty({ description: 'User avatar' })
  @Field(() => String, { nullable: true })
  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'avatar',
  })
  avatar?: string;

  @ApiProperty({ example: 'buyer', description: 'User role' })
  @Field(() => String)
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'role',
  })
  role: string;

  @ApiProperty({
    example: 'Rostovskaya oblast,Taganrog gorod, Krasnaya ulitsa, 1 dom',
    description: 'User address',
  })
  @Field(() => String, { nullable: true })
  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'address',
  })
  address?: string;

  @Field(() => Boolean, { nullable: true })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false,
    field: 'is_deleted',
  })
  isDeleted?: boolean;

  @HasOne(() => Password)
  password: Password;

  @HasOne(() => RefreshToken)
  refresh: RefreshToken;

  @HasMany(() => BrowsingHistory)
  browsingHistory: BrowsingHistory[];

  @HasMany(() => DeliveryAddress)
  deliveryAddress: DeliveryAddress[];

  @HasMany(() => PurchaseHistory)
  purchaseHistory: PurchaseHistory[];

  @HasMany(() => Comment)
  comment: Comment[];

  @HasMany(() => FavoritesProduct)
  favoritesProduct: FavoritesProduct[];

  @HasMany(() => FavoritesShop)
  favoritesShop: FavoritesShop[];

  @HasOne(() => Shop)
  shop: Shop;

  @HasMany(() => Order)
  order: Order[];

  @HasMany(() => Basket)
  basket: Basket[];
}

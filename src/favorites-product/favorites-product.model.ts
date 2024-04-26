import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { Product } from '../product/product.model';
import { User } from '../users/user.model';

interface FavoritesProductCreateAttributes {
  productId: number;
  userId: number;
}

@ObjectType()
@Table({ tableName: 'favorites_product' })
export class FavoritesProduct extends Model<
  FavoritesProduct,
  FavoritesProductCreateAttributes
> {
  @Field(() => Int)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Field(() => Int)
  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    field: 'product_id',
  })
  productId: number;

  @Field(() => Int)
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
  })
  userId: number;

  @Field(() => Product)
  @BelongsTo(() => Product)
  product: Product;

  @Field(() => User)
  @BelongsTo(() => User)
  user: User;
}

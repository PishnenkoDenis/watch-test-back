import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from 'src/product/product.model';

import { User } from '../users/user.model';
import { Shop } from './shop.model';

interface CommentCreateAttribute {
  description?: string;
  productId: number;
  userId: number;
  shopId: number;
}

@Table({ tableName: 'comment' })
export class Comment extends Model<Comment, CommentCreateAttribute> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    field: 'description',
  })
  description: string;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    field: 'product_id',
  })
  productId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
  })
  userId: number;

  @ForeignKey(() => Shop)
  @Column({
    type: DataType.INTEGER,
    field: 'shop_id',
  })
  shopId: number;

  @BelongsTo(() => Product)
  product: Product;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Shop)
  shop: Shop;
}

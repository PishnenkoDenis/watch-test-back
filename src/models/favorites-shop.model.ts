import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { User } from '../users/user.model';
import { Shop } from './shop.model';

interface FavoritesShopCreateAttributes {
  shopeId: number;
  userId: number;
}

@Table({ tableName: 'favorites_shop' })
export class FavoritesShop extends Model<
  FavoritesShop,
  FavoritesShopCreateAttributes
> {
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Shop)
  @Column({
    type: DataType.INTEGER,
    field: 'shop_id',
  })
  shopId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
  })
  userId: number;

  @BelongsTo(() => Shop)
  shop: Shop;

  @BelongsTo(() => User)
  user: User;
}

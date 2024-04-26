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

interface BrowsingHistoryCreateAttributes {
  viewingDate: string;
  productId: number;
  userId: number;
}

@Table({ tableName: 'browsing_history' })
export class BrowsingHistory extends Model<
  BrowsingHistory,
  BrowsingHistoryCreateAttributes
> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'viewing_date',
  })
  viewingDate: string;

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

  @BelongsTo(() => Product)
  product: Product;

  @BelongsTo(() => User)
  user: User;
}

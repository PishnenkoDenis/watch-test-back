import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { User } from '../users/user.model';
import { Order } from './order.model';

interface PurchaseHistoryCreateAttributes {
  orderId: number;
  userId: number;
}

@Table({ tableName: 'purchase_history' })
export class PurchaseHistory extends Model<
  PurchaseHistory,
  PurchaseHistoryCreateAttributes
> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
    field: 'order_id',
  })
  orderId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
  })
  userId: number;

  @BelongsTo(() => Order)
  order: Order;

  @BelongsTo(() => User)
  user: User;
}

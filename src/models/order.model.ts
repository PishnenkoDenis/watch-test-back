import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from 'src/product/product.model';

import { User } from '../users/user.model';
import { OrderProduct } from './order-product.model';
import { Payment } from './payment.model';
import { PurchaseHistory } from './purchase-history.model';

interface OrderCreateAttribute {
  price: string;
  userId: number;
}

@Table({ tableName: 'order' })
export class Order extends Model<Order, OrderCreateAttribute> {
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'price',
  })
  price: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
  })
  userId: number;

  @HasOne(() => PurchaseHistory)
  purchaseHistory: PurchaseHistory;

  @HasOne(() => Payment)
  payment: Payment;

  @HasMany(() => OrderProduct)
  orderProduct: OrderProduct[];

  @HasMany(() => Product)
  product: Product[];
}

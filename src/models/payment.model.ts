import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { Order } from './order.model';

interface PaymentCreateAttributes {
  date: string;
  method: string;
  status: boolean;
  orderId: number;
}

@Table({ tableName: 'payment' })
export class Payment extends Model<Payment, PaymentCreateAttributes> {
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'date',
  })
  date: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'method',
  })
  method: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    field: 'status',
  })
  status: boolean;

  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
    field: 'order_id',
  })
  orderId: number;

  @BelongsTo(() => Order)
  order: Order;
}

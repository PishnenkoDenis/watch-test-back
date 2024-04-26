import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { Product } from '../product/product.model';

interface SpecificationProductCreateAttributes {
  specification: string;
  productId: number;
}

@Table({ tableName: 'specification_product' })
export class SpecificationProduct extends Model<
  SpecificationProduct,
  SpecificationProductCreateAttributes
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
    field: 'specification',
  })
  specification: string;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    field: 'product_id',
  })
  productId: number;

  @BelongsTo(() => Product)
  product: Product;
}

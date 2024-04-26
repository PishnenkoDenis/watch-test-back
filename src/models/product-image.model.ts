import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { Product } from '../product/product.model';

interface ProductImageCreateAttribute {
  name: string;
  path: string;
  productId: number;
}

@Table({ tableName: 'product_image' })
export class ProductImage extends Model<
  ProductImage,
  ProductImageCreateAttribute
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
    field: 'name',
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'path',
  })
  path: string;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    field: 'product_id',
  })
  productId: number;

  @BelongsTo(() => Product)
  product: Product;
}

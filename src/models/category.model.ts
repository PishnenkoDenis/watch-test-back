import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

import { Shop } from './shop.model';
import { SubCategory } from './sub-category.model';

interface CategoryCreateAttributes {
  isDeleted: boolean;
  type: string;
  shopId: number;
}

@Table({ tableName: 'category' })
export class Category extends Model<Category, CategoryCreateAttributes> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    field: 'd',
  })
  isDeleted: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'type',
  })
  type: string;

  @ForeignKey(() => Shop)
  @Column({
    type: DataType.INTEGER,
    field: 'shop_id',
  })
  shopId: number;

  @BelongsTo(() => Shop)
  shop: Shop;

  @HasMany(() => SubCategory)
  subCategory: SubCategory;
}

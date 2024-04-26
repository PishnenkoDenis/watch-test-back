import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { Category } from './category.model';

interface SubCategoryCreateAttributes {
  type: string;
  categoryId: number;
}

@Table({ tableName: 'sub_category' })
export class SubCategory extends Model<
  SubCategory,
  SubCategoryCreateAttributes
> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    field: 'category_id',
  })
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;
}

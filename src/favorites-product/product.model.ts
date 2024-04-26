import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';

import { Basket } from '../basket/basket.model';
import { BrowsingHistory } from '../models/browsing-history.model';
import { Comment } from '../models/comment.model';
import { Order } from '../models/order.model';
import { OrderProduct } from '../models/order-product.model';
import { ProductImage } from '../models/product-image.model';
import { Shop } from '../models/shop.model';
import { SpecificationProduct } from '../models/specification-product.model';
import { SubCategory } from '../models/sub-category.model';
import { FavoritesProduct } from './favorites-product.model';

interface ProductCreateAttributes {
  title: string;
  description: string;
  price: number;
  rating: number;
  isDeleted: boolean;
  shopId: number;
  orderId: number;
  subCategoryId: number;
}

@ObjectType()
@Table({ tableName: 'product' })
export class Product extends Model<Product, ProductCreateAttributes> {
  @Field(() => Int)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Field()
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'title',
  })
  title: string;

  @Field()
  @Column({
    type: DataType.TEXT,
    allowNull: false,
    field: 'description',
  })
  description: string;

  @Field(() => Int)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'price',
  })
  price: number;

  @Field()
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    field: 'is_deleted',
  })
  isDeleted: boolean;

  @Field(() => Int)
  @ForeignKey(() => Shop)
  @Column({
    type: DataType.INTEGER,
    field: 'shop_id',
  })
  shopId: number;

  @Field(() => Int)
  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
    field: 'order_id',
  })
  orderId: number;

  @Field(() => Int)
  @ForeignKey(() => SubCategory)
  @Column({
    type: DataType.INTEGER,
    field: 'sub_category_id',
  })
  subCategoryId: number;

  @HasMany(() => Basket)
  Basket: Basket;

  @HasOne(() => SpecificationProduct)
  specificationProduct: SpecificationProduct;

  @HasMany(() => Comment)
  comment: Comment[];

  @HasMany(() => ProductImage)
  productImage: ProductImage[];

  @HasMany(() => BrowsingHistory)
  browsingHistory: BrowsingHistory[];

  @HasMany(() => FavoritesProduct)
  favoritesProduct: FavoritesProduct[];

  @HasMany(() => OrderProduct)
  orderProduct: OrderProduct[];
}

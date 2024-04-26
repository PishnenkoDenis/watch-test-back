import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { Shop } from './shop.model';

interface CreateLanguageAttributes {
  language: string;
  shop_id: number;
}

@ObjectType()
@Table({ tableName: 'languages' })
export class Languages extends Model<Languages, CreateLanguageAttributes> {
  @ApiProperty({ example: 1, description: 'Shop id' })
  @Field(() => Int)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Русский', description: 'Selected language' })
  @Field(() => String)
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'language',
  })
  language: string;

  @ApiProperty({ example: 1, description: 'Shop ID' })
  @Field(() => Int)
  @ForeignKey(() => Shop)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'shop_id',
  })
  shop_id: number;

  @BelongsTo(() => Shop)
  shop: Shop;
}

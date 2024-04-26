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
import { User } from 'src/users/user.model';

interface DiscountCreateAttributes {
  discountName: string;
  procent: number;
  condition: number;
  userId: number;
}

@ObjectType()
@Table({ tableName: 'discount' })
export class Discount extends Model<Discount, DiscountCreateAttributes> {
  @ApiProperty({ example: 1, description: 'Discount id' })
  @Field(() => Int)
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Discount 10', description: 'Discount Name' })
  @Field(() => String)
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'discount_name',
  })
  discountName: string;

  @ApiProperty({ example: '10%', description: 'Discount percent' })
  @Field(() => Int)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'percent',
  })
  percent: number;

  @ApiProperty({ example: '100', description: 'Discount condition' })
  @Field(() => Int)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'condition',
  })
  condition: number;

  @ApiProperty({ example: '1', description: 'Id of user who owns discouts' })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}

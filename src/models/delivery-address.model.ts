import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { User } from '../users/user.model';

interface DeliveryAddressCreateAttributes {
  city: string;
  region: string;
  country: string;
  postalCode: string;
  outside: string;
  houseNumber: string;
  apartment?: string;
  userId: number;
}

@Table({ tableName: 'delivery_address' })
export class DeliveryAddress extends Model<
  DeliveryAddress,
  DeliveryAddressCreateAttributes
> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Taganrog', description: 'City delivery' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'city',
  })
  city: string;

  @ApiProperty({ example: 'Postovskay', description: 'Region delivery' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'region',
  })
  region: string;

  @ApiProperty({ example: 'Russia', description: 'Country delivery' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'country',
  })
  country: string;

  @ApiProperty({ example: '350000', description: 'Postal code delivery' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'postal_code',
  })
  postalCode: string;

  @ApiProperty({ example: 'Krasnay', description: 'Outside delivery' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'outside',
  })
  outside: string;

  @ApiProperty({ example: '10a', description: 'House number delivery' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'house_number',
  })
  houseNumber: string;

  @ApiProperty({ example: '1', description: 'Apartment delivery' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'apartment',
  })
  apartment: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}

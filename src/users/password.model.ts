import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { User } from './user.model';

interface PasswordCreationAttributes {
  hash: string;
  userId: number;
}

@Table({ tableName: 'password' })
export class Password extends Model<Password, PasswordCreationAttributes> {
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
  })
  hash: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
  })
  userId: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    field: 'is_deleted',
  })
  isDeleted: boolean;

  @BelongsTo(() => User)
  user: User;
}

import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { User } from './user.model';

interface TokenCreateAttributes {
  expiresAt: number;
  refresh: string;
  userId: number;
}

@Table({ tableName: 'refresh_token' })
export class RefreshToken extends Model<RefreshToken, TokenCreateAttributes> {
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
    field: 'expires_in',
  })
  expiresAt: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    field: 'refresh',
  })
  refresh: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}

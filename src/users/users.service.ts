import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { Transaction } from 'sequelize';
import { ERoles } from 'src/config';
import { unauthorizedError } from 'src/utils/errors';

import { UserPasswordParamsInterface } from './interfaces/create-password.interface';
import { Password } from './password.model';
import { RefreshToken } from './refresh-token.model';
import { User } from './user.model';

type WhereProps = {
  isDeleted?: boolean;
  roleName?: ERoles[];
};

type TDefaultParams = {
  where?: WhereProps;
  roles?: ERoles[];
  transaction?: Transaction;
};

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Password)
    private passwordRepository: typeof Password,
    @InjectModel(User)
    private userRepository: typeof User,
    @InjectModel(RefreshToken)
    private refreshTokenRepository: typeof RefreshToken,
  ) {}

  async createPassword(
    passwordParam: UserPasswordParamsInterface,
    transaction?: Transaction,
  ): Promise<Password> {
    const hash = await bcrypt.hash(passwordParam.password, 10);

    return this.passwordRepository.create(
      {
        hash,
        userId: passwordParam.userId,
      },
      {
        transaction,
      },
    );
  }

  async updatePassword(
    oldPassword: string,
    newPassword: string,
    userId: number,
  ): Promise<Password> {
    const password = await this.passwordRepository.findOne({
      attributes: ['id', 'hash', 'userId'],
      where: { userId },
    });

    const comparedPassword = await bcrypt.compare(oldPassword, password.hash);

    if (comparedPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      return await password.update({ hash: hashedPassword });
    } else throw new BadRequestException('Uncorrect old password');
  }

  async deleteRefreshToken(refresh: string, transaction?: Transaction) {
    return await this.refreshTokenRepository.destroy({
      where: {
        refresh,
      },
      transaction,
    });
  }

  async getUserById(id: number, params?: TDefaultParams) {
    return await this.userRepository.findOne({
      attributes: [
        'id',
        'fullName',
        'email',
        'phone',
        'avatar',
        'isDeleted',
        'birthday',
      ],
      where: {
        id,
        ...(typeof params?.where?.isDeleted === 'boolean' && {
          isDeleted: params.where.isDeleted,
        }),
      },
      transaction: params?.transaction,
      raw: true,
      nest: true,
    });
  }

  async validateUser(id: number, param?: TDefaultParams) {
    const { transaction, where } = param || {};
    const userRecord = await this.getUserById(id, {
      transaction,
      where,
    });

    if (!userRecord || userRecord.isDeleted) {
      unauthorizedError();
    }

    return userRecord;
  }

  async createRefreshToken(userId: number, refresh: string) {
    return await this.refreshTokenRepository.create({
      userId: userId,
      refresh,
      expiresAt: Number(process.env.JWT_REFRESH_EXPIRES_IN),
    });
  }
}

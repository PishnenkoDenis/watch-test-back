import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { Sequelize } from 'sequelize-typescript';

import { UserSecret } from './user-secret.model';

@Injectable()
export class UserSecretService {
  constructor(
    @InjectModel(UserSecret)
    private userSecretRepository: typeof UserSecret,
    private sequelize: Sequelize,
  ) {}

  async getOrCreateUserSecret(userId: number) {
    const secretRecord = await this.userSecretRepository.findOne({
      attributes: ['secret', 'userId'],
      where: {
        userId,
        isDeleted: false,
      },
    });

    if (!secretRecord) {
      return await this.createUserSecret(userId);
    }

    return secretRecord.secret;
  }

  async compareSecret(userId: number, secret: string) {
    const secretRecord = await this.userSecretRepository.findOne({
      attributes: ['secret', 'userId'],
      where: {
        userId,
        secret,
        isDeleted: false,
      },
    });

    return Boolean(secretRecord);
  }

  async createUserSecret(userId: number) {
    const secret = await bcrypt.hash(`${Date.now()}_${userId}`, 10);

    await this.sequelize.transaction(async (t) => {
      const secretRecord = await this.userSecretRepository.findOne({
        attributes: ['secret', 'userId'],
        where: {
          userId,
          isDeleted: false,
        },
        transaction: t,
      });

      if (secretRecord) {
        await this.userSecretRepository.destroy({
          where: {
            userId,
          },
          transaction: t,
        });
      }

      return this.userSecretRepository.create(
        {
          secret,
          userId,
        },
        {
          transaction: t,
        },
      );
    });

    return secret;
  }
}

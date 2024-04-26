import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/user.model';

import { UserSecret } from './user-secret.model';
import { UserSecretService } from './user-secret.service';

@Module({
  exports: [UserSecretService],
  imports: [SequelizeModule.forFeature([User, UserSecret])],
  providers: [UserSecretService],
})
export class UserSecretModule {}

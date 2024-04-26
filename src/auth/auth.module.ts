import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserSecretModule } from 'src/user-secret/user-secret.module';
import { UserSecretService } from 'src/user-secret/user-secret.service';
import { Password } from 'src/users/password.model';
import { User } from 'src/users/user.model';
import { UsersModule } from 'src/users/users.module';

import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthResolver, AuthService],
  imports: [
    forwardRef(() => UsersModule),
    UserSecretModule,
    SequelizeModule.forFeature([User, Password]),
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    JwtModule.register({
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN || '24h',
      },
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}

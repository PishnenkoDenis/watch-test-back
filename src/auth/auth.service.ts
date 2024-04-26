import { Body, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { Envs, ERoles } from 'src/config';
import { UserSecretService } from 'src/user-secret/user-secret.service';
import { Password } from 'src/users/password.model';
import { User } from 'src/users/user.model';
import { UsersService } from 'src/users/users.service';
import {
  expiredTokenError,
  forbiddenError,
  unauthorizedError,
} from 'src/utils/errors';

import { LoginViaEmailDto } from './dto/login-via-email.dto';
import { CreateUserDto } from './dto/registrate-user.dto';

export interface ITokens {
  access: string;
  refresh: string;
}

export interface loginInterface {
  isAdmin?: boolean;
  roles?: ERoles[];
}

export interface IUserAccessToken {
  role: ERoles;
  secret: string;
  email: string;
  id: number;
}

export interface IUserRefreshToken {
  role: ERoles;
  secret: string;
  email: string;
  id: number;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
    @InjectModel(Password)
    private passwordRepository: typeof Password,
    private userService: UsersService,
    private jwtService: JwtService,
    private userSecretService: UserSecretService,
  ) {}

  async login(@Body() user: LoginViaEmailDto) {
    const userRecord = await this.validateUser(user.email, user.phone);

    if (!userRecord) {
      unauthorizedError();
    }

    const comparedPassword = await this.validatePassword(user, userRecord.id);

    if (userRecord && comparedPassword) {
      const secret = await this.userSecretService.getOrCreateUserSecret(
        userRecord.id,
      );
      const tokens = await this.generateTokens(userRecord, secret);
      await this.userService.createRefreshToken(userRecord.id, tokens.refresh);

      return { tokens, userRecord };
    }

    unauthorizedError();
  }

  clearTokens(res: Response) {
    this.setTokens(res, null, 0);
  }

  setTokens(context, tokens?: ITokens, date?: number) {
    const expiresAccess =
      date ?? Date.now() + Number(process.env.JWT_ACCESS_EXPIRES_IN) * 1000;
    const expiresRefresh =
      date ?? Date.now() + Number(process.env.JWT_REFRESH_EXPIRES_IN) * 1000;

    context.res
      .cookie('access_token', tokens?.access, {
        httpOnly: true,
        path: '/',
        ...(process.env.NODE_ENV !== Envs.development && {
          sameSite: 'none',
          secure: true,
        }),
        domain: process.env.DOMAIN,
        expires: new Date(expiresAccess),
      })
      .cookie('refresh_token', tokens?.refresh, {
        httpOnly: true,
        path: '/',
        ...(process.env.NODE_ENV !== Envs.development && {
          sameSite: 'none',
          secure: true,
        }),
        domain: process.env.DOMAIN,
        expires: new Date(expiresRefresh),
      });
  }

  private async generateTokens(user: User, secret: string) {
    const accessPayload = {
      secret,
      roleName: user.role,
      email: user.email,
      id: user.id,
    };
    const refreshPayload = {
      secret,
      roleName: user.role,
      email: user.email,
      id: user.id,
    };

    const access = this.jwtService.sign(accessPayload, {
      expiresIn: Date.now() + Number(process.env.JWT_ACCESS_EXPIRES_IN) * 1000,
      secret: `${process.env.JWT_ACCESS_SECRET}`,
    });

    const refresh = this.jwtService.sign(refreshPayload, {
      expiresIn: Date.now() + Number(process.env.JWT_REFRESH_EXPIRES_IN) * 1000,
      secret: `${process.env.JWT_REFRESH_SECRET}`,
    });

    return {
      access,
      refresh,
    };
  }

  async validateUser(email?: string, phone?: string): Promise<User> {
    const userRecord = await this.userRepository.findOne({
      attributes: ['role', 'fullName', 'email', 'phone', 'id'],
      where: {
        ...(email ? { email } : { phone }),
      },
    });

    return userRecord;
  }

  async validatePassword(user: LoginViaEmailDto, id: number): Promise<boolean> {
    const passwordRecord = await this.passwordRepository.findOne({
      attributes: ['hash'],
      where: {
        userId: id,
      },
    });

    return await bcrypt.compare(user.password, passwordRecord.hash);
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    const { password, ...userParams } = dto;

    const candidate = await this.validateUser(dto.email, dto.phone);

    if (candidate) {
      forbiddenError('User already exists');
    }

    const userRecord = await this.userRepository.create({
      ...userParams,
    });

    await this.userService.createPassword({
      userId: userRecord.id,
      password: password,
    });

    return userRecord;
  }

  async refresh(res: Response, prevTokens) {
    const userData = await this.validateRefreshToken(prevTokens.refresh);
    const isValidUserSecret = await this.userSecretService.compareSecret(
      userData.id,
      userData.secret,
    );

    if (!isValidUserSecret) {
      this.clearTokens(res);
      await this.userService.deleteRefreshToken(prevTokens.refresh);

      unauthorizedError();
    }

    const userRecord = await this.userService.getUserById(userData.id, {
      where: {
        isDeleted: false,
      },
    });
    const secret = await this.userSecretService.getOrCreateUserSecret(
      userRecord.id,
    );
    const tokens = await this.generateTokens(userRecord, secret);
    await this.userService.deleteRefreshToken(prevTokens.refresh);
    await this.userService.createRefreshToken(userRecord.id, tokens.refresh);

    return tokens;
  }

  private async validateRefreshToken(refresh: string) {
    try {
      return this.jwtService.verify(refresh, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        expiredTokenError();
      }

      unauthorizedError();
    }
  }
}

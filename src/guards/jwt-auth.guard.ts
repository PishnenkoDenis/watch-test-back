import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { ERoles, forbiddenError } from 'src/config';
import { UserSecretService } from 'src/user-secret/user-secret.service';
import { UsersService } from 'src/users/users.service';
import { expiredTokenError, unauthorizedError } from 'src/utils/errors';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
    private readonly userSecretService: UserSecretService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    try {
      const access = req.cookies['access_token'];
      const refresh = req.cookies['refresh_token'];

      if (!access) {
        unauthorizedError();
      }

      const user = await this.jwtService.verify(access, {
        secret: process.env.JWT_ACCESS_SECRET,
      });

      const isValidSecret = await this.userSecretService.compareSecret(
        user.id,
        user.secret,
      );

      if (!isValidSecret) {
        this.authService.clearTokens(res);
        await this.usersService.deleteRefreshToken(refresh);

        unauthorizedError();
      }

      req.user = await this.usersService.validateUser(user.id, {
        where: {
          isDeleted: false,
        },
      });
      req.isOwner = req.user.roleName === ERoles.owner;

      return true;
    } catch (error) {
      if (error.status) {
        throw error;
      }

      if (error.name === 'TokenExpiredError') {
        expiredTokenError();
      }

      forbiddenError();
    }
  }
}

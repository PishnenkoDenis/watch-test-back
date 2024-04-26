import { Inject, Req, Res } from '@nestjs/common';
import {
  Args,
  Context,
  GraphQLExecutionContext,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { Response } from 'express';
import { serverResponseOK } from 'src/config';
import { User } from 'src/users/user.model';

import { AuthService } from './auth.service';
import { LoginViaEmailDto } from './dto/login-via-email.dto';
import { CreateUserDto } from './dto/registrate-user.dto';

@Resolver(() => User)
export class AuthResolver {
  constructor(
    @Inject(AuthService)
    private authService: AuthService,
  ) {}

  @Mutation(() => User)
  async loginUser(
    @Args('user') user: LoginViaEmailDto,
    @Context() context: GraphQLExecutionContext,
  ) {
    const { tokens, userRecord } = await this.authService.login(user);
    this.authService.setTokens(context, tokens);
    return userRecord;
  }

  @Query(() => User)
  async refresh(@Req() req, @Res({ passthrough: true }) res: Response) {
    const access = req.cookies['access_token'];
    const refresh = req.cookies['refresh_token'];
    const tokens = await this.authService.refresh(res, { access, refresh });

    this.authService.setTokens(res, tokens);

    return serverResponseOK;
  }

  @Mutation(() => User)
  async createUser(@Args('dto') dto: CreateUserDto): Promise<User> {
    return await this.authService.createUser(dto);
  }
}

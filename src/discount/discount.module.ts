import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/user.model';

import { Discount } from './discount.model';
import { DiscountResolver } from './discount.resolver';
import { DiscountService } from './discount.service';

@Module({
  imports: [SequelizeModule.forFeature([Discount, User])],
  providers: [DiscountService, DiscountResolver],
})
export class DiscountModule {}

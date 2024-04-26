import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from 'src/product/product.model';
import { User } from 'src/users/user.model';

import { Basket } from './basket.model';
import { BasketResolver } from './basket.resolver';
import { BasketService } from './basket.service';

@Module({
  imports: [SequelizeModule.forFeature([Basket, Product, User])],
  providers: [BasketResolver, BasketService],
})
export class BasketModule {}

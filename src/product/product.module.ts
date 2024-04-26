import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Product } from './product.model';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

@Module({
  providers: [ProductService, ProductResolver],
  imports: [SequelizeModule.forFeature([Product])],
  exports: [ProductService],
})
export class ProductModule {}

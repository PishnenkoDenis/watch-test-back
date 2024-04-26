import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Product } from './product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product)
    private productRepository: typeof Product,
  ) {}

  async getNovelties(limit = 12): Promise<Product[]> {
    return await this.productRepository.findAll({
      attributes: ['id', 'price', 'title', 'description'],
      where: {
        isDeleted: false,
      },
      order: [['createdAt', 'DESC']],
      limit,
    });
  }
}

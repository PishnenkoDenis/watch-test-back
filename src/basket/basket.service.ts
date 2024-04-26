import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { forbiddenError } from 'src/config';

import { Product } from '../product/product.model';
import { Basket } from './basket.model';
import { CreateBasketInput } from './dto/create-basket.input';

@Injectable()
export class BasketService {
  constructor(
    @InjectModel(Basket)
    private basketRepository: typeof Basket,
    @InjectModel(Product)
    private productRepository: typeof Product,
  ) {}

  async getBasketData(id: number) {
    const result = await this.basketRepository.findAll({
      where: { userId: id },
      include: [
        {
          model: this.productRepository,
        },
      ],
    });
    if (!result?.length) {
      throw new NotFoundException();
    }
    return result;
  }

  async addToBasket(addItem: CreateBasketInput) {
    const availability = await this.basketRepository.findAll({
      where: {
        [Op.and]: { userId: addItem.userId, productId: addItem.productId },
      },
    });
    if (availability?.length) {
      forbiddenError();
    }
    return await this.basketRepository.create(addItem);
  }

  async removeFromBasket(itemId: number) {
    const availability = await this.basketRepository.findOne({
      where: {
        id: itemId,
      },
    });
    if (!availability) {
      forbiddenError();
    }
    await this.basketRepository.destroy({
      where: {
        id: itemId,
      },
    });
  }
}

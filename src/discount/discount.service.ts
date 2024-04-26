import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Discount } from './discount.model';
import { CreateDiscountDto } from './dto/create-discount.dto';

@Injectable()
export class DiscountService {
  constructor(
    @InjectModel(Discount) private discountRepository: typeof Discount,
  ) {}

  async create(dto: CreateDiscountDto): Promise<Discount> {
    const candidate = await this.discountRepository.findOne({
      attributes: ['id', 'discountName', 'percent', 'condition'],
      where: { percent: dto.percent, condition: dto.condition },
    });
    if (candidate) {
      throw new BadRequestException(
        'Discount with these percent and condition already exists',
      );
    }
    return await this.discountRepository.create(dto);
  }

  async getAll(id: number): Promise<Discount[]> {
    return await this.discountRepository.findAll({
      attributes: ['id', 'discountName', 'percent', 'condition'],
      where: { userId: id },
      order: [['percent', 'ASC']],
    });
  }

  async remove(itemId: number) {
    await this.discountRepository.destroy({ where: { id: itemId } });
  }

  async update(itemId: number, dto: CreateDiscountDto) {
    const model = await this.discountRepository.findOne({
      attributes: ['id', 'discountName', 'percent', 'condition'],
      where: { id: itemId },
    });

    return await model.update(dto);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { Currency } from 'src/models/currency.model';
import { Filename } from 'src/models/filename.model';
import { Languages } from 'src/models/languages.model';
import { Notifications } from 'src/models/notifications.model';
import { Shop } from 'src/models/shop.model';
import { UsersService } from 'src/users/users.service';

import { CreateShopDto } from './dto/create-shop.dto';

@Injectable()
export class ShopService {
  constructor(
    @InjectModel(Shop) private shopRepository: typeof Shop,
    @InjectModel(Languages) private languagesRepository: typeof Languages,
    @InjectModel(Currency) private currencyRepository: typeof Currency,
    @InjectModel(Notifications)
    private notificationsRepository: typeof Notifications,
    private usersService: UsersService,
    private fileUploadService: FileUploadService,
  ) {}

  async create({
    title,
    description,
    logo,
    wallpaper,
    telephone,
    email,
    address,
    legalEntity,
    inn,
    kpp,
    legalAddress,
    bank,
    bik,
    checkAccount,
    corpAccount,
    userId,
    language,
    currency,
    notifications,
    newPassword,
    oldPassword,
  }: CreateShopDto): Promise<Shop> {
    const shop = this.shopRepository.build({
      title,
      description,
      telephone,
      email,
      address,
      legal_entity: legalEntity,
      inn,
      kpp,
      legal_address: legalAddress,
      bank,
      bik,
      check_account: checkAccount,
      corp_account: corpAccount,
      user_id: userId,
    });

    const recievedLogo = await logo;
    const recievedWallpaper = await wallpaper;

    if (recievedLogo) {
      const logoPath = await this.fileUploadService.createFile(recievedLogo);
      shop.logo = logoPath.filename;
    }

    if (recievedWallpaper) {
      const wallpaperPath = await this.fileUploadService.createFile(
        recievedWallpaper,
      );
      shop.wallpaper = wallpaperPath.filename;
    }

    if (newPassword && oldPassword) {
      await this.usersService.updatePassword(oldPassword, newPassword, userId);
    }

    await shop.save();

    await this.languagesRepository.create({
      language,
      shop_id: shop.id,
    });

    await this.currencyRepository.create({
      currency,
      shop_id: shop.id,
    });

    await Promise.all(
      notifications.map((notification) =>
        this.notificationsRepository.create({
          ...notification,
          shopId: shop.id,
        }),
      ),
    );

    return shop;
  }

  async update(
    shopId: number,
    {
      title,
      description,
      logo,
      wallpaper,
      telephone,
      email,
      address,
      legalEntity,
      inn,
      kpp,
      legalAddress,
      bank,
      bik,
      checkAccount,
      corpAccount,
      userId,
      language,
      currency,
      notifications,
      newPassword,
      oldPassword,
    }: CreateShopDto,
  ) {
    const shop = await this.shopRepository.findOne({
      attributes: [
        'id',
        'title',
        'description',
        'logo',
        'wallpaper',
        'telephone',
        'email',
        'address',
        'legal_entity',
        'inn',
        'kpp',
        'legal_address',
        'bank',
        'bik',
        'check_account',
        'corp_account',
      ],
      where: { id: shopId },
      include: { all: true },
    });

    let logoName: Filename;
    let wallpaperName: Filename;

    const recievedLogo = await logo;
    const recievedWallpaper = await wallpaper;

    if (language) await shop.language.update({ language });

    if (currency) await shop.currency.update({ currency });

    await Promise.all(
      notifications.map((notification) =>
        this.notificationsRepository.update(
          {
            ...notification,
          },
          { where: { shopId: shop.id } },
        ),
      ),
    );

    if (newPassword && oldPassword) {
      await this.usersService.updatePassword(oldPassword, newPassword, userId);
    }

    if (recievedLogo) {
      logoName = await this.fileUploadService.createFile(recievedLogo);
    }

    if (recievedWallpaper) {
      wallpaperName = await this.fileUploadService.createFile(
        recievedWallpaper,
      );
    }

    return await shop.update({
      title,
      description,
      telephone,
      email,
      address,
      legal_entity: legalEntity,
      inn,
      kpp,
      legal_address: legalAddress,
      bank,
      bik,
      check_account: checkAccount,
      corp_account: corpAccount,
      logo: logoName.filename,
      wallpaper: wallpaperName.filename,
    });
  }

  async remove(shopId: number) {
    await this.shopRepository.destroy({ where: { id: shopId } });
  }

  async get(userId: number): Promise<Shop> {
    return await this.shopRepository.findOne({
      attributes: [
        'id',
        'title',
        'description',
        'logo',
        'wallpaper',
        'telephone',
        'email',
        'address',
        'legal_entity',
        'inn',
        'kpp',
        'legal_address',
        'bank',
        'bik',
        'check_account',
        'corp_account',
      ],
      where: { user_id: userId },
      include: { all: true },
    });
  }
}

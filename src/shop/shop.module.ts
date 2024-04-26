import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FileUploadModule } from 'src/file-upload/file-upload.module';
import { Currency } from 'src/models/currency.model';
import { Languages } from 'src/models/languages.model';
import { Notifications } from 'src/models/notifications.model';
import { Shop } from 'src/models/shop.model';
import { UsersModule } from 'src/users/users.module';

import { ShopResolver } from './shop.resolver';
import { ShopService } from './shop.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Shop, Notifications, Currency, Languages]),
    UsersModule,
    FileUploadModule,
  ],
  providers: [ShopService, ShopResolver],
})
export class ShopModule {}

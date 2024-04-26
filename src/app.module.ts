import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { SequelizeModule } from '@nestjs/sequelize';

import { FooResolver } from './app.controllers';
import { AuthModule } from './auth/auth.module';
import { Basket } from './basket/basket.model';
import { BasketModule } from './basket/basket.module';
import { Discount } from './discount/discount.model';
import { DiscountModule } from './discount/discount.module';
import { FavoritesProduct } from './favorites-product/favorites-product.model';
import { FavoritesProductModule } from './favorites-product/favorites-product.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { BrowsingHistory } from './models/browsing-history.model';
import { Category } from './models/category.model';
import { Comment } from './models/comment.model';
import { Currency } from './models/currency.model';
import { DeliveryAddress } from './models/delivery-address.model';
import { FavoritesShop } from './models/favorites-shop.model';
import { Languages } from './models/languages.model';
import { Notifications } from './models/notifications.model';
import { Order } from './models/order.model';
import { OrderProduct } from './models/order-product.model';
import { Payment } from './models/payment.model';
import { ProductImage } from './models/product-image.model';
import { PurchaseHistory } from './models/purchase-history.model';
import { Shop } from './models/shop.model';
import { SpecificationProduct } from './models/specification-product.model';
import { SubCategory } from './models/sub-category.model';
import { Product } from './product/product.model';
import { ProductModule } from './product/product.module';
import { ShopModule } from './shop/shop.module';
import { UserSecretModule } from './user-secret/user-secret.module';
import { Password } from './users/password.model';
import { RefreshToken } from './users/refresh-token.model';
import { User } from './users/user.model';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      context: ({ req, res }) => ({ req, res }),
      autoSchemaFile: true,
      cache: 'bounded',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER_NAME,
      password: process.env.DB_USER_PASSWORD,
      database: process.env.DB_NAME,
      models: [
        User,
        Basket,
        BrowsingHistory,
        Category,
        Comment,
        DeliveryAddress,
        FavoritesProduct,
        FavoritesShop,
        Order,
        OrderProduct,
        Password,
        Payment,
        Product,
        ProductImage,
        PurchaseHistory,
        Shop,
        SpecificationProduct,
        SubCategory,
        RefreshToken,
        Discount,
        Notifications,
        Languages,
        Currency,
      ],
      autoLoadModels: true,
    }),
    BasketModule,
    FavoritesProductModule,
    UsersModule,
    AuthModule,
    UserSecretModule,
    ProductModule,
    DiscountModule,
    ShopModule,
    FileUploadModule,
  ],
  controllers: [],
  providers: [FooResolver],
})
export class AppModule {}

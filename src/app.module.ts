import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from './_common/config/ormconfig';
import { AuthModule } from './auth/auth.module';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
} from 'nestjs-i18n';
import { PlaygroundModule } from './playground/playground.module';
import * as path from 'path';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './_common/guards/auth.guard';
import { PermissionGuard } from './_common/guards/permission.guard';
import { AllExceptionsFilter } from './_common/filters/main.filter';
import { RequestLangMiddleware } from './_common/middlewares/lang.middleware';
import { AuthMiddleware } from './_common/middlewares/auth.midleware';
import { UsersModule } from './user/users.module';
import { CustomerModule } from './customer/customer.module';
import { DayOffModule } from './day-off/day-off.module';
import { ReservationModule } from './reservation/reservation.module';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/_common/i18n/'), // or '../i18n/'
        watch: true,
      },
      resolvers: [
        { use: HeaderResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
    AuthModule,
    UsersModule,
    CustomerModule,
    PlaygroundModule,
    DayOffModule,
    ReservationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,

    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },

    { provide: APP_FILTER, useClass: AllExceptionsFilter },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLangMiddleware).forRoutes('*');
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}

import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatCacheModule } from './caches/cat-cache/cat-cache.module';
import { UserCacheModule } from './caches/user-cache/user-cache.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() : any => {}]
    }),
    CatCacheModule, UserCacheModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [CatCacheModule, UserCacheModule],
})
export class AppModule {}

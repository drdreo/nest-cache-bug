import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { CatCacheService } from './cat-cache.service';

@Module({
    imports: [CacheModule.register({ ttl: 60 * 10 * 1000, max: 1000 })],
    providers: [CatCacheService],
    exports: [CatCacheService]
})
export class CatCacheModule {}

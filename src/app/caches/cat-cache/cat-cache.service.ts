import { Cache } from 'cache-manager';
import { MemoryCacheService } from '../memory-cache.service';
import {CACHE_MANAGER} from "@nestjs/cache-manager";
import {Inject} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";

export class CatCacheService extends MemoryCacheService<any> {
    constructor(
        @Inject(CACHE_MANAGER) protected cacheManager: Cache,
        private configService: ConfigService
    ) {
        super(cacheManager);
    }

    override async store(key: string, value: any): Promise<void> {
        if (this.configService.get('caching.cat', { infer: true })) {
            return super.store(key, value);
        }
    }
}

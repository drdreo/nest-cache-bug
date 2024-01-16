import { Cache } from 'cache-manager';
import { MemoryCacheService } from '../memory-cache.service';
import {Inject} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {CACHE_MANAGER} from "@nestjs/cache-manager";

export class UserCacheService extends MemoryCacheService<any> {
    constructor(
        @Inject(CACHE_MANAGER) protected cacheManager: Cache,
        private configService: ConfigService
    ) {
        super(cacheManager);
    }

    override async store(key: string, value: any): Promise<void> {
        if (this.configService.get('caching.user', { infer: true })) {
            return super.store(key, value);
        }
    }
}

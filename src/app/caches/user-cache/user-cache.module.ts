import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import {UserCacheService} from "./user-cache.service";

@Module({
    imports: [
        CacheModule.register({
            ttl: 60 * 3 * 1000,
            max: 500,
        })
    ],
    providers: [UserCacheService],
    exports: [UserCacheService]
})
export class UserCacheModule {}

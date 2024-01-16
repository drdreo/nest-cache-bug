import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';

export class MemoryCacheService<T> {
    private logger = new Logger(MemoryCacheService.name);

    constructor(@Inject(CACHE_MANAGER) protected cacheManager: Cache) {}

    async store(key: string, value: T): Promise<void> {
        this.logger.debug(`Storing: ${key}`);
        return this.cacheManager.set(key, value);
    }

    async get(key: string): Promise<T | undefined> {
        this.logger.debug(`Getting: ${key}`);
        return this.cacheManager.get<T>(key);
    }

    async delete(key: string): Promise<void> {
        this.logger.debug(`Deleting: ${key}`);
        return this.cacheManager.del(key);
    }

    async keys(): Promise<string[]> {
        return this.cacheManager.store.keys?.();
    }
}

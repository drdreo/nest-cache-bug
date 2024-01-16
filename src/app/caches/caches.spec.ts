import {ConfigModule, ConfigService} from '@nestjs/config';
import {Test} from '@nestjs/testing';
import {UserCacheService} from "./user-cache/user-cache.service";
import {CatCacheService} from "./cat-cache/cat-cache.service";
import {UserCacheModule} from "./user-cache/user-cache.module";
import {CatCacheModule} from "./cat-cache/cat-cache.module";

const MOCK_USER_KEY = 'test-user';
const MOCK_USER = {
    id: 'xxx',
    name: 'DrDreo'
};

const MOCK_CAT_KEY = 'test-cat';
const MOCK_CAT = {
    id: 'aaa',
    name: 'Catus',
    age: 3
};

describe('Caching', () => {
    let userCache: UserCacheService;
    let catCache: CatCacheService;
    let configService: ConfigService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({
                    ignoreEnvVars: true,
                    ignoreEnvFile: true,
                    isGlobal: true,
                    load: [(): any => ({caching: {user: true, cat: true}})]
                }),
                UserCacheModule,
                CatCacheModule
            ]
        }).compile();

        userCache = moduleRef.get<UserCacheService>(UserCacheService);
        catCache = moduleRef.get<CatCacheService>(CatCacheService);
        configService = moduleRef.get<ConfigService>(ConfigService);
    });

    it('should not have anything', async () => {
        const caches = {
            userCache: await userCache.keys(),
            catCache: await catCache.keys(),
        };

        expect(caches.userCache).toEqual([]);
        expect(caches.catCache).toEqual([]);
    });

    describe('User', () => {
        it('should store a user', async () => {
            await userCache.store(MOCK_USER_KEY, MOCK_USER as any);
            const entry = await userCache.get(MOCK_USER_KEY);
            expect(entry).toEqual(MOCK_USER);

            // other caches should not have the entry
            const cat = await catCache.get(MOCK_USER_KEY);
            expect(cat).toBeUndefined();

            const caches = {
                userCache: await userCache.keys(),
                catCache: await catCache.keys(),
            };

            expect(caches.userCache).toEqual([MOCK_USER_KEY]);
            expect(caches.catCache).toEqual([]);
        });
    });

    describe('Cat', () => {
        it('should NOT store if disabled', async () => {
            jest.spyOn(configService, 'get').mockImplementation(() => false);

            await catCache.store(MOCK_CAT_KEY, MOCK_CAT as any);
            const cat = await catCache.get(MOCK_CAT_KEY);
            expect(cat).toBeUndefined();
        });

        it('should store a cat', async () => {
            await catCache.store(MOCK_CAT_KEY, MOCK_CAT as any);
            const cat = await catCache.get(MOCK_CAT_KEY);
            expect(cat).toEqual(MOCK_CAT);

            // other caches should not have the entry
            const user = await userCache.get(MOCK_CAT_KEY);
            expect(user).toBeUndefined();


            const caches = {
                userCache: await userCache.keys(),
                catCache: await catCache.keys(),
            };

            expect(caches.catCache).toEqual([MOCK_CAT_KEY]);
            expect(caches.userCache).toEqual([]);
        });
    });
});

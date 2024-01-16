# NestjsBug

Run tests to verify caching aint working as expected
run `npx nx test`


Expected behavior: Is that different cache modules can be configured differently. I would expect that the cache manager is not shared between the two modules.

Actual behavior: The cache manager is shared between the two modules since upgrade `@nestjs/common@10.3.0` and `@nestjs/core@10.3.0`.

When using `"@nestjs/common": "10.2.10", "@nestjs/core": "10.2.10"`, it works as expected.


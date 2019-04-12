# json-logger-service

Provides a Json [Nest LoggerService](https://docs.nestjs.com/techniques/logger).

## Installation

```bash
$ npm i json-logger-service
```

## Usage

```typescript
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {JsonLoggerService} from 'json-logger-service';

const bootstrap = async () => {
    const app = await NestFactory.create(AppModule);
    app.useLogger(new JsonLoggerService('NestServer'));
    await app.listen(3000);
};
bootstrap();
```

# json-logger-service

Provides a Json [Nest LoggerService](https://docs.nestjs.com/techniques/logger).

## Installation

```bash
$ npm i json-logger-service
```

## Usage

### Nest Json LoggerService implementation use

Configuring Nest to use a custom Json LoggerService.

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

### Using a new Json logger in your classes

```typescript
import {JsonLogger, LoggerFactory} from 'json-logger-service';

export class HelloWorldService {
    private logger: JsonLogger = LoggerFactory.createLogger(HelloWorldService.name);

    public getHello(): string {
        this.logger.info('Hello World!');
        this.logger.info({myContextProperty: 'My property\'s value', anotherProperty: 'Another value'}, 'Hello World with some context!');
        return 'Hello World!';
    }
}
```

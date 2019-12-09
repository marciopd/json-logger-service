# json-logger-service

Provides a Json [Nest LoggerService](https://docs.nestjs.com/techniques/logger).

## Installation

```bash
$ npm i json-logger-service --save
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
    private readonly logger: JsonLogger = LoggerFactory.createLogger(HelloWorldService.name);

    public getHello(): string {
        this.logger.info('Hello World!');
        this.logger.info({myContextProperty: 'My property\'s value', anotherProperty: 'Another value'}, 'Hello World with some context!');
        return 'Hello World!';
    }
}
```

### Use Express request logger

Configuring Nest to use a simple Express request logger.

```typescript
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {RequestLogger} from 'json-logger-service';

const bootstrap = async () => {
    const app = await NestFactory.create(AppModule);
    ...
    app.use(new RequestLogger().logExpressRequest);
    ...
    await app.listen(3000);
};
bootstrap();
```

Considering a request to  `/mypath`, the logger output should be something like:
```json
{"name":"RequestLogger","hostname":"HOSTNAME","pid":PID,"level":30,"msg":"Before request GET '/mypath'","time":"2019-12-09T12:10:23.020Z","v":0}
{"name":"RequestLogger","hostname":"HOSTNAME","pid":PID,"level":30,"msg":"After request GET '/mypath'","time":"2019-12-09T12:10:23.021Z","v":0}

```

An array of base paths you don't want to log (for security or GDPR reasons maybe) can be passed in the RequestLogger constructor.

```typescript
app.use(new RequestLogger(['/my-path-with-sensible-information']).logExpressRequest);
```

Then, considering a request to  `/my-path-with-sensible-information/customerEmail@gmail.com`, the logger output should be something like:
```json
{"name":"RequestLogger","hostname":"HOSTNAME","pid":PID,"level":30,"msg":"Before request GET 'Path Omitted'","time":"2019-12-09T12:10:23.020Z","v":0}
{"name":"RequestLogger","hostname":"HOSTNAME","pid":PID,"level":30,"msg":"After request GET 'Path Omitted'","time":"2019-12-09T12:10:23.021Z","v":0}

```

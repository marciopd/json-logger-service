# json-logger-service 
[![](https://img.shields.io/npm/dm/json-logger-service.svg)](https://www.npmjs.com/package/json-logger-service)

Provides a Json [Nest LoggerService](https://docs.nestjs.com/techniques/logger).

## Installation

```bash
$ npm i json-logger-service --save
```

## Usage

### Nest.js compatibility matrix

| Nest.js version | json-logger-service compatible version |
|-----------------|:--------------------------------------:|
| 9.x.x           |                 9.x.x                  |
| 8.x.x           |                 8.x.x                  |
| 7.x.x           |                 7.x.x                  |


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
    app.use(RequestLogger.buildExpressRequestLogger());
    ...
    await app.listen(3000);
};
bootstrap();
```

Considering a request to  `/mypath`, the logger output should be something like:
```json
{"name":"RequestLogger","hostname":"HOSTNAME","pid":1,"level":30,"msg":"Before request GET '/mypath'","time":"2019-12-09T12:10:23.020Z","v":0}
{"name":"RequestLogger","hostname":"HOSTNAME","pid":1,"level":30,"msg":"After request GET '/mypath'","time":"2019-12-09T12:10:23.021Z","v":0}

```

#### doNotLogPaths

An array of base paths you do NOT want to log at all can be passed too.

```typescript
app.use(RequestLogger.buildExpressRequestLogger({ doNotLogPaths: ['/health-server-status'] } as RequestLoggerOptions));
```

Then considering a request to  `/health-server-status`, the logger will not log anything.

#### logOnlyBasePaths

An array of base paths you want to log without the full path (for security or GDPR reasons maybe) can be passed in the RequestLogger constructor.

```typescript
app.use(RequestLogger.buildExpressRequestLogger({ logOnlyBasePaths: ['/my-path'] } as RequestLoggerOptions));
```

Then, considering a request to  `/my-path/customerEmail@gmail.com`, the logger output should be something like:

```json
{"name":"RequestLogger","hostname":"HOSTNAME","pid":1,"level":30,"msg":"Before request GET '/my-path'","time":"2019-12-09T12:10:23.020Z","v":0}
{"name":"RequestLogger","hostname":"HOSTNAME","pid":1,"level":30,"msg":"After request GET '/my-path'","time":"2019-12-09T12:10:23.021Z","v":0}

```

### Logging Level

General Logging level can be changed centrally using [environment property](https://nodejs.dev/learn/how-to-read-environment-variables-from-nodejs) LOGGER_LEVEL.
Possible values: 
- fatal
- error
- warn
- info (default)
- debug
- trace

### Pretty print

It's possible to pretty-print the logs by configuring [environment property](https://nodejs.dev/learn/how-to-read-environment-variables-from-nodejs) LOGGER_PRETTY_PRINT as 'true'. 

This mode is NOT recommended for production environment.

Here's an example on how to do it:
```bash
LOGGER_PRETTY_PRINT=true npm run test
```

Then the console output would look like:

```bash
[2022-05-03T20:22:19.588Z]  INFO: MyPrettyLogger/22689 on MBP-van-Marcio: It works! (env=local)
```
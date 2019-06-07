import * as Logger from 'bunyan';
import { JsonLogger } from './JsonLogger.interface';

export class LoggerFactory {
  public static createLogger(name: string): JsonLogger {
    return Logger.createLogger({
      name,
      serializers: {
        error: Logger.stdSerializers.err,
      },
      env: process.env.LOGGER_ENV,
    });
  }
}

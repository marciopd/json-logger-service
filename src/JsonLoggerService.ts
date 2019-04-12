import { LoggerService } from '@nestjs/common';
import { JsonLogger } from './JsonLogger.interface';
import { LoggerFactory } from './LoggerFactory';

/**
 * Nest json logger service implementation.
 */
export class JsonLoggerService implements LoggerService {
  private logger: JsonLogger;

  public constructor(name: string) {
    this.logger = LoggerFactory.createLogger(name);
  }

  public log(message: any, context?: string): any {
    return this.logger.info(message, context);
  }

  public error(message: any, trace?: string, context?: string): any {
    return this.logger.error(message, trace, context);
  }

  public warn(message: any, context?: string): any {
    return this.logger.warn(message, context);
  }

  public debug?(message: any, context?: string): any {
    return this.logger.debug(message, context);
  }

  public verbose?(message: any, context?: string): any {
    return this.logger.trace(message, context);
  }
}

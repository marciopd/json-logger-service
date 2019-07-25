import { LoggerService } from '@nestjs/common';
import { JsonLogger } from './JsonLogger';
import { LoggerFactory } from './LoggerFactory';
import { CustomContextBuilderInterface } from './CustomContextBuilder.interface';

/**
 * Nest json logger service implementation.
 */
export class JsonLoggerService implements LoggerService {
  private logger: JsonLogger;

  public constructor(name: string, customContextBuilder?: CustomContextBuilderInterface) {
    this.logger = LoggerFactory.createLogger(name, customContextBuilder);
  }

  public log(message: any, context?: string): any {
    return this.logger.info(context, message);
  }

  public error(message: any, trace?: string, context?: string): any {
    return this.logger.error(context, trace, message);
  }

  public warn(message: any, context?: string): any {
    return this.logger.warn(context, message);
  }

  public debug?(message: any, context?: string): any {
    return this.logger.debug(context, message);
  }

  public verbose?(message: any, context?: string): any {
    return this.logger.trace(context, message);
  }
}

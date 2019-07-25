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

  public log(context: any, message?: string): any {
    return this.logger.info(context, message);
  }

  public error(context: any, trace?: string, message?: string): any {
    return this.logger.error(context, trace, message);
  }

  public warn(context: any, message?: string): any {
    return this.logger.warn(context, message);
  }

  public debug?(context: any, message?: string): any {
    return this.logger.debug(context, message);
  }

  public verbose?(context: any, message?: string): any {
    return this.logger.trace(context, message);
  }
}

import * as Logger from 'bunyan';
import {CustomContextBuilderInterface} from './CustomContextBuilder.interface';
import {LoggerFactory} from './LoggerFactory';

/**
 * More details: https://github.com/trentm/node-bunyan
 */
export class JsonLogger {
  public constructor(private readonly bunyanLogger: Logger,
                     private readonly customContextBuilder?: CustomContextBuilderInterface) {
  }

  public info(context: any, message?: string): void {
    const bunyanParams = this.getBunyanParams(message, context);
    this.bunyanLogger.info(bunyanParams.context, bunyanParams.message);
  }

  public error(context: any, trace?: string, message?: string): void {
    if (trace && message) {
      const bunyanParams = this.getBunyanParams(message, context);
      this.bunyanLogger.error(bunyanParams.context, trace, bunyanParams.message);
    } else if (trace) {
      const bunyanParams = this.getBunyanParams(trace, context);
      this.bunyanLogger.error(bunyanParams.context, bunyanParams.message);
    } else {
      const bunyanParams = this.getBunyanParams(undefined, context);
      this.bunyanLogger.error(bunyanParams.context, bunyanParams.message);
    }
  }

  public warn(context: any, message?: string): void {
    const bunyanParams = this.getBunyanParams(message, context);
    this.bunyanLogger.warn(bunyanParams.context, bunyanParams.message);
  }

  public debug(context: any, message?: string): void {
    const bunyanParams = this.getBunyanParams(message, context);
    this.bunyanLogger.debug(bunyanParams.context, bunyanParams.message);
  }

  public trace(context: any, message?: string): void {
    const bunyanParams = this.getBunyanParams(message, context);
    this.bunyanLogger.trace(bunyanParams.context, bunyanParams.message);
  }

  public fatal(context: any, message?: string): void {
    const bunyanParams = this.getBunyanParams(message, context);
    this.bunyanLogger.fatal(bunyanParams.context, bunyanParams.message);
  }

  private getBunyanParams(message: string, context: any) {
    const contextObj = (typeof context) === 'object' ? context : { context };
    return {
      context: message === undefined ?
          this.getDefaultContextObject()
          : Object.assign(this.getDefaultContextObject(), contextObj),
      message: message === undefined ? context : message,
    };
  }

  private getDefaultContextObject(): any {
    const defaultCustomContextBuilder = LoggerFactory.defaultCustomContextBuilder;
    return this.customContextBuilder && this.customContextBuilder.buildCustomContext()
        || defaultCustomContextBuilder && defaultCustomContextBuilder.buildCustomContext()
        || {};
  }
}

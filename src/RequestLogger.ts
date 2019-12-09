import { JsonLogger } from './JsonLogger';
import { LoggerFactory } from './LoggerFactory';

export class RequestLogger {
  private readonly logger: JsonLogger = LoggerFactory.createLogger(RequestLogger.name);

  public logExpressRequest(req, res, next): void {
    const requestPath = req && req.route && req.route.path;
    if (!requestPath) {
      this.logger.warn('No request path defined.');
      next();
      return;
    }

    this.logger.info(`Before request '${requestPath}'`);
    next();
    this.logger.info(`After request '${requestPath}'`);
  }
}

import { JsonLogger } from './JsonLogger';
import { LoggerFactory } from './LoggerFactory';

export class RequestLogger {
  private static readonly LOGGER: JsonLogger = LoggerFactory.createLogger(RequestLogger.name);

  public logExpressRequest(req, res, next): void {
    const requestPath = req && req.route && req.route.path;
    if (!requestPath) {
      RequestLogger.LOGGER.warn('No request path defined.');
      next();
      return;
    }

    RequestLogger.LOGGER.info(`Before request '${requestPath}'`);
    next();
    RequestLogger.LOGGER.info(`After request '${requestPath}'`);
    return;
  }
}

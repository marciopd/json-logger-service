import { JsonLogger } from './JsonLogger';
import { LoggerFactory } from './LoggerFactory';
const onFinished = require('on-finished');

export class RequestLogger {
  private static readonly LOGGER: JsonLogger = LoggerFactory.createLogger(RequestLogger.name);

  public logExpressRequest(req, res, next): void {
    const requestPath = req && req.route && req.route.path;
    if (!requestPath) {
      RequestLogger.LOGGER.warn('No request path defined.');
      next();
      return;
    }

    const method = req.method ? req.method : '';
    RequestLogger.LOGGER.info(`Before request ${method} '${requestPath}'`);
    onFinished(res, (error) => {
      RequestLogger.LOGGER.info(
          `After request ${method} '${requestPath}' with ${error ? 'ERROR' : 'SUCCESS'}`);
    });

    next();
    return;
  }
}

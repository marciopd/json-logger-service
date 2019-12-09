import { JsonLogger } from './JsonLogger';
import { LoggerFactory } from './LoggerFactory';

const onFinished = require('on-finished');

const PATH_OMITTED = 'Path Omitted';

export class RequestLogger {
  private static readonly LOGGER: JsonLogger = LoggerFactory.createLogger(RequestLogger.name);

  public static buildExpressRequestLogger(omitBasePaths?: string[]): any {
    if (!omitBasePaths) {
      // tslint:disable-next-line:no-parameter-reassignment
      omitBasePaths = [];
    }

    return (req, res, next) => {
      if (!(req && req.path)) {
        RequestLogger.LOGGER.warn('No request path defined.');
        next();
        return;
      }

      const requestPath = RequestLogger.isPathOmitted(req.path, omitBasePaths)
          ? PATH_OMITTED : req.path;

      const method = req.method ? req.method : '';
      RequestLogger.LOGGER.info({ uri: requestPath }, `Before request ${method} '${requestPath}'`);
      onFinished(res, () => {
        RequestLogger.LOGGER.info(
            { uri: requestPath }, `After request ${method} '${requestPath}'`);
      });

      next();
    };
  }

  private static isPathOmitted(requestPath: string, omitBasePaths: string[]): boolean {
    for (const blackListedPath of omitBasePaths) {
      if (requestPath.startsWith(blackListedPath)) {
        return true;
      }
    }
    return false;
  }
}

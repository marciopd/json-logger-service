import { JsonLogger } from './JsonLogger';
import { LoggerFactory } from './LoggerFactory';
const onFinished = require('on-finished');

const PATH_OMITTED = 'Path Omitted';

export class RequestLogger {
  private static readonly LOGGER: JsonLogger = LoggerFactory.createLogger(RequestLogger.name);

  /**
   * Accepts an array of paths (base paths, without query string or parameters)
   * which should not be logged.
   * @param omitBasePaths
   */
  public constructor(private readonly omitBasePaths?: string[]) {
    if (!this.omitBasePaths) {
      this.omitBasePaths = [];
    }
  }

  public logExpressRequest(req, res, next): void {
    if (!(req && req.path)) {
      RequestLogger.LOGGER.warn('No request path defined.');
      next();
      return;
    }

    const requestPath = this.isPathOmitted(req.path) ? PATH_OMITTED : req.path;

    const method = req.method ? req.method : '';
    RequestLogger.LOGGER.info(`Before request ${method} '${requestPath}'`);
    onFinished(res, () => {
      RequestLogger.LOGGER.info(
          `After request ${method} '${requestPath}'`);
    });

    next();
    return;
  }

  private isPathOmitted(requestPath: string): boolean {
    for (const blackListedPath of this.omitBasePaths) {
      if (requestPath.startsWith(blackListedPath)) {
        return true;
      }
    }
    return false;
  }
}

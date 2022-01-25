import {LoggerFactory} from './LoggerFactory';
import {RequestLoggerOptions} from './RequestLoggerOptions';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const onFinished = require('on-finished');

export class RequestLogger {
    public static buildExpressRequestLogger(options?: RequestLoggerOptions): any {
        if (!options) {
            // tslint:disable-next-line:no-parameter-reassignment
            options = {} as any;
        }

        if (!options.doNotLogPaths) {
            options.doNotLogPaths = [];
        }

        if (!options.logOnlyBasePaths) {
            options.logOnlyBasePaths = [];
        }

        if (!options.jsonLogger) {
            options.jsonLogger = LoggerFactory.createLogger(RequestLogger.name);
        }

        const logger = options.jsonLogger;

        return (req, res, next) => {
            if (!(req && req.path)) {
                logger.warn('No request path defined.');
                next();
                return;
            }

            if (RequestLogger.isInDoNotLogPaths(req.path, options.doNotLogPaths)) {
                next();
                return;
            }

            const requestPath = RequestLogger.getPathToLog(req.path, options.logOnlyBasePaths);

            const method = req.method ? req.method : '';
            logger.info({uri: requestPath},
                        `Before request ${method} '${requestPath}'`);
            onFinished(res, () => {
                logger.info({uri: requestPath}, `After request ${method} '${requestPath}'`);
            });

            next();
        };
    }

    private static getPathToLog(requestPath: string, logOnlyBasePaths: string[]): string {
        for (const logOnlyBasePath of logOnlyBasePaths) {
            if (requestPath.startsWith(logOnlyBasePath)) {
                return logOnlyBasePath;
            }
        }
        return requestPath;
    }

    private static isInDoNotLogPaths(requestPath: string, doNotLogPaths: string[]): boolean {
        for (const doNotLogPath of doNotLogPaths) {
            if (requestPath.startsWith(doNotLogPath)) {
                return true;
            }
        }
        return false;
    }
}

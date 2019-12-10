import * as Logger from 'bunyan';
import {JsonLogger} from './JsonLogger';
import {CustomContextBuilderInterface} from './CustomContextBuilder.interface';

export class LoggerFactory {
    public static defaultCustomContextBuilder: CustomContextBuilderInterface;

    // tslint:disable-next-line:typedef
    public static setDefaultLogCustomContextBuilder(
        defaultCustomContextBuilder: CustomContextBuilderInterface) {
        LoggerFactory.defaultCustomContextBuilder = defaultCustomContextBuilder;
    }

    public static createLogger(
        name: string,
        customContextBuilder?: CustomContextBuilderInterface): JsonLogger {
        const bunyanLogger = Logger.createLogger({
                                                     name,
                                                     serializers: {
                                                         error: Logger.stdSerializers.err,
                                                     },
                                                     env: process.env.LOGGER_ENV,
                                                 });
        return new JsonLogger(bunyanLogger, customContextBuilder);
    }
}

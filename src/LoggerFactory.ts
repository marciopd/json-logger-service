import * as Logger from 'bunyan';
import * as PrettyStream from 'bunyan-prettystream';
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

        let stream = undefined;
        if (process.env.LOGGER_PRETTY_PRINT === 'true') {
            stream = new PrettyStream();
            stream.pipe(process.stdout);
        }

        const bunyanLogger = Logger.createLogger({
                                                     name,
                                                     serializers: {
                                                         error: Logger.stdSerializers.err,
                                                     },
                                                     env: process.env.LOGGER_ENV,
                                                     level: process.env.LOGGER_LEVEL || 'info',
                                                     stream: stream,
                                                 });
        return new JsonLogger(bunyanLogger, customContextBuilder);
    }
}

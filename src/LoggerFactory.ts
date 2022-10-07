import * as Logger from "bunyan";
import { JsonLogger } from "./JsonLogger";
import { CustomContextBuilderInterface } from "./CustomContextBuilder.interface";

export class LoggerFactory {
  public static defaultCustomContextBuilder: CustomContextBuilderInterface;

  // tslint:disable-next-line:typedef
  public static setDefaultLogCustomContextBuilder(
    defaultCustomContextBuilder: CustomContextBuilderInterface
  ) {
    LoggerFactory.defaultCustomContextBuilder = defaultCustomContextBuilder;
  }

  public static createLogger(
    name: string,
    customContextBuilder?: CustomContextBuilderInterface
  ): JsonLogger {
    let stream = undefined;
    stream.pipe(process.stdout);

    const bunyanLogger = Logger.createLogger({
      name,
      serializers: {
        error: Logger.stdSerializers.err,
      },
      env: process.env.LOGGER_ENV,
      level: process.env.LOGGER_LEVEL || "info",
      stream: stream,
    });
    return new JsonLogger(bunyanLogger, customContextBuilder);
  }
}

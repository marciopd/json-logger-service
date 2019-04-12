/**
 * More details: https://github.com/trentm/node-bunyan
 */
export interface JsonLogger {
  info: (...value: string | any) => any | void;
  debug: (...value: string | any) => any | void;
  warn: (...value: string | any) => any | void;
  trace: (...value: string | any) => any | void;
  fatal: (...value: string | any) => any | void;
  error: (...value: string | any) => any | void;
}

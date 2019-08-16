import { JsonLogger, JsonLoggerService, LoggerFactory } from '../index';

describe('JsonLoggerService tests', () => {
  describe('Creating object with success', () => {
    let jsonLoggerService: JsonLoggerService;

    beforeAll(async () => {
      process.env.LOGGER_ENV = 'test';
      LoggerFactory.setDefaultLogCustomContextBuilder(undefined);
      jsonLoggerService = new JsonLoggerService('MyLoggerService');
    });

    it('Should return a new instance', () => {
      expect(jsonLoggerService).toBeDefined();
    });

    it('Should log info', () => {
      jsonLoggerService.log('It works!');
    });

    it('Should use custom context builder', () => {
      const customLogger = new JsonLoggerService('MyLoggerService', {
        buildCustomContext(): any {
          return { 'x-request-id': '8324-234-234-234' };
        },
      });
      customLogger.log('Log with x-request-id');
    });

    it('Should use default context builder', () => {
      LoggerFactory.setDefaultLogCustomContextBuilder({
        buildCustomContext(): any {
          return { PROP_A: 'YES' };
        },
      });
      const customLogger = new JsonLoggerService('MyLoggerService');
      customLogger.log('Log with default custom context builder');
    });

    it('Should log error', () => {
      jsonLoggerService.error('It works!', 'TRACE', 'CONTEXT');
    });

    it('Should log debug', () => {
      jsonLoggerService.debug('It works!', 'CONTEXT');
    });

    it('Should log warn', () => {
      jsonLoggerService.warn('It works!', 'CONTEXT');
    });

    it('Should log verbose', () => {
      jsonLoggerService.verbose('It works!');
    });
  });
});

describe('LoggerFactory tests', () => {
  describe('Creating Logger with success', () => {
    let logger: JsonLogger;

    beforeAll(() => {
      logger = LoggerFactory.createLogger('MyLogger');
    });

    it('Should return a new instance', () => {
      expect(logger).toBeDefined();
    });

    it('Should log info without throwing errors', () => {
      logger.info('It works!');
    });

    it('Should log debug without throwing errors', () => {
      logger.debug('It works!');
    });

    it('Should log error without throwing errors', () => {
      logger.error('It works!');
    });

    it('Should log error with context without throwing errors', () => {
      logger.error({ context: 'Hello World' }, 'It works!');
    });

    it('Should log error with context and trace without throwing errors', () => {
      logger.error({ context: 'Hello World' }, 'TRACE', 'It works!');
    });

    it('Should log warn without throwing errors', () => {
      logger.warn('It works!');
    });

    it('Should log fatal without throwing errors', () => {
      logger.fatal('It works!');
    });

    it('Should log trace without throwing errors', () => {
      logger.trace('It works!');
    });
  });
});

import {JsonLogger, RequestLogger, RequestLoggerOptions} from '../index';
import {anything, capture, instance, mock, verify} from 'ts-mockito';

describe('RequestLogger tests', () => {
    let requestLogger: any;
    let nextCalled: boolean;
    let loggerMock: JsonLogger;
    const nextFunction = () => {
        nextCalled = true;
    };
    const responseMock = {
        socket: {
            finished: true,
        },
    };

    beforeEach(async () => {
        loggerMock = mock(JsonLogger);
        requestLogger = RequestLogger.buildExpressRequestLogger({jsonLogger: instance(loggerMock)} as RequestLoggerOptions);
        nextCalled = false;
    });

    describe('When request is undefined', () => {
        beforeEach(() => {
            requestLogger(undefined, undefined, nextFunction);
        });

        it('Should return without failing', () => {
            expect(nextCalled).toBeTruthy();
            verify(loggerMock.info(anything(), anything())).never();
            verify(loggerMock.warn('No request path defined.')).once();
            verify(loggerMock.error(anything())).never();
        });
    });

    describe('When path is undefined', () => {
        beforeEach(() => {
            requestLogger({path: undefined}, undefined, nextFunction);
        });

        it('Should return without failing', () => {
            expect(nextCalled).toBeTruthy();
            verify(loggerMock.info(anything(), anything())).never();
            verify(loggerMock.warn('No request path defined.')).once();
            verify(loggerMock.error(anything())).never();
        });
    });

    describe('When path is defined', () => {
        beforeEach(() => {
            requestLogger({path: '/mypath'}, responseMock, nextFunction);
        });

        it('Should log path', (done) => {
            setTimeout(() => {
                expect(nextCalled).toBeTruthy();
                verify(loggerMock.info(anything(), anything())).twice();
                const capturedInputs = capture(loggerMock.info);
                assertInfoMessageEquals(capturedInputs.first(), {uri: '/mypath'}, 'Before request  \'/mypath\'');
                assertInfoMessageEquals(capturedInputs.second(), {uri: '/mypath'}, 'After request  \'/mypath\'');
                verify(loggerMock.warn(anything())).never();
                verify(loggerMock.error(anything())).never();
                done();
            }, 200);
        });
    });

    describe('When path and method is defined', () => {
        beforeEach(() => {
            requestLogger({path: '/mypath', method: 'GET'}, responseMock, nextFunction);
        });

        it('Should log path and method', (done) => {
            setTimeout(() => {
                expect(nextCalled).toBeTruthy();
                verify(loggerMock.info(anything(), anything())).twice();
                const capturedInputs = capture(loggerMock.info);
                assertInfoMessageEquals(capturedInputs.first(), {uri: '/mypath'}, 'Before request GET \'/mypath\'');
                assertInfoMessageEquals(capturedInputs.second(), {uri: '/mypath'}, 'After request GET \'/mypath\'');
                verify(loggerMock.warn(anything())).never();
                verify(loggerMock.error(anything())).never();
                done();
            }, 200);
        });
    });

    describe('When path should not be logged', () => {
        beforeEach(() => {
            requestLogger = RequestLogger.buildExpressRequestLogger(
                {doNotLogPaths: ['/mypath/do-not-log'], jsonLogger: instance(loggerMock)} as RequestLoggerOptions);
            requestLogger({path: '/mypath/do-not-log/customerEmail@gmail.com', method: 'GET'}, responseMock, nextFunction);
        });

        it('Should return without logging', (done) => {
            setTimeout(() => {
                expect(nextCalled).toBeTruthy();
                verify(loggerMock.info(anything(), anything())).never();
                verify(loggerMock.warn(anything())).never();
                verify(loggerMock.error(anything())).never();
                done();
            }, 200);
        });
    });

    describe('When path should log only base url', () => {
        beforeEach(() => {
            requestLogger = RequestLogger.buildExpressRequestLogger(
                {
                    logOnlyBasePaths: ['/mypath/log-only-base-path'],
                    jsonLogger: instance(loggerMock),
                } as RequestLoggerOptions);
            requestLogger({path: '/mypath/log-only-base-path/customerEmail@gmail.com', method: 'GET'}, responseMock, nextFunction);
        });

        it('Should log only the base path, instead of the full path', (done) => {
            setTimeout(() => {
                expect(nextCalled).toBeTruthy();
                verify(loggerMock.info(anything(), anything())).twice();
                const capturedInputs = capture(loggerMock.info);
                assertInfoMessageEquals(capturedInputs.first(), {uri: '/mypath/log-only-base-path'}, 'Before request GET \'/mypath/log-only-base-path\'');
                assertInfoMessageEquals(capturedInputs.second(), {uri: '/mypath/log-only-base-path'}, 'After request GET \'/mypath/log-only-base-path\'');
                verify(loggerMock.warn(anything())).never();
                verify(loggerMock.error(anything())).never();
                done();
            }, 200);
        });
    });
});

const assertInfoMessageEquals = (message: any, expectedContext: any, expectedMessage: string): void => {
    expect(message[0]).toEqual(expectedContext);
    expect(message[1]).toEqual(expectedMessage);
};

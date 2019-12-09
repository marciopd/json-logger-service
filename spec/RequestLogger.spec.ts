import { RequestLogger } from '../index';

describe('RequestLogger tests', () => {
  let requestLogger: RequestLogger;
  let nextCalled: boolean;
  const nextFunction = () => { nextCalled = true; };
  const responseMock = {
    socket: {
      finished: true,
    },
  };

  beforeAll(async () => {
    requestLogger = new RequestLogger();
    nextCalled = false;
  });

  describe('When request is undefined', () => {
    beforeEach(() => {
      requestLogger.logExpressRequest(undefined, undefined, nextFunction);
    });

    it('Should return without failing', () => {
      expect(nextCalled).toBeTruthy();
    });
  });

  describe('When route is undefined', () => {
    beforeEach(() => {
      requestLogger.logExpressRequest({}, undefined, nextFunction);
    });

    it('Should return without failing', () => {
      expect(nextCalled).toBeTruthy();
    });
  });

  describe('When path is undefined', () => {
    beforeEach(() => {
      requestLogger.logExpressRequest({ route: undefined }, undefined, nextFunction);
    });

    it('Should return without failing', () => {
      expect(nextCalled).toBeTruthy();
    });
  });

  describe('When path is defined', () => {
    beforeEach(() => {
      requestLogger.logExpressRequest({ route: { path: '/mypath' } }, responseMock, nextFunction);
    });

    it('Should return without failing', () => {
      expect(nextCalled).toBeTruthy();
    });
  });

  describe('When path and method is defined', () => {
    beforeEach(() => {
      requestLogger.logExpressRequest({ route: { path: '/mypath' }, method: 'GET' },
                                      responseMock, nextFunction);
    });

    it('Should return without failing', () => {
      expect(nextCalled).toBeTruthy();
    });
  });
});

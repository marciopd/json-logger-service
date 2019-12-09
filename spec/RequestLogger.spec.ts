import { RequestLogger } from '../index';

describe('RequestLogger tests', () => {
  let requestLogger: any;
  let nextCalled: boolean;
  const nextFunction = () => { nextCalled = true; };
  const responseMock = {
    socket: {
      finished: true,
    },
  };

  beforeAll(async () => {
    requestLogger = RequestLogger.buildExpressRequestLogger();
    nextCalled = false;
  });

  describe('When request is undefined', () => {
    beforeEach(() => {
      requestLogger(undefined, undefined, nextFunction);
    });

    it('Should return without failing', () => {
      expect(nextCalled).toBeTruthy();
    });
  });

  describe('When path is undefined', () => {
    beforeEach(() => {
      requestLogger({ path: undefined }, undefined, nextFunction);
    });

    it('Should return without failing', () => {
      expect(nextCalled).toBeTruthy();
    });
  });

  describe('When path is defined', () => {
    beforeEach(() => {
      requestLogger({ path: '/mypath' }, responseMock, nextFunction);
    });

    it('Should return without failing', () => {
      expect(nextCalled).toBeTruthy();
    });
  });

  describe('When path and method is defined', () => {
    beforeEach(() => {
      requestLogger({ path: '/mypath', method: 'GET' }, responseMock, nextFunction);
    });

    it('Should return without failing', () => {
      expect(nextCalled).toBeTruthy();
    });
  });

  describe('When path is blacklisted', () => {
    beforeEach(() => {
      requestLogger = RequestLogger.buildExpressRequestLogger(['/mypath/do-not-log']);
      requestLogger(
          { path: '/mypath/do-not-log/customerEmail@gmail.com', method: 'GET' },
          responseMock, nextFunction);
    });

    it('Should return without failing', () => {
      expect(nextCalled).toBeTruthy();
    });
  });
});

import {JsonLogger} from './JsonLogger';

export class RequestLoggerOptions {
    public doNotLogPaths: string[];
    public logOnlyBasePaths: string[];
    public jsonLogger: JsonLogger;
}

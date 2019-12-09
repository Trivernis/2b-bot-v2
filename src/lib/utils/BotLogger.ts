import {createLogger, Logger, transports, format} from "winston";
import * as DailyRotateFile from "winston-daily-rotate-file";
import * as fsx from "fs-extra";
import * as path from "path";

export type Transport = transports.ConsoleTransportInstance
    | transports.FileTransportInstance
    | transports.StreamTransportInstance
    | transports.HttpTransportInstance
    | DailyRotateFile;

export type LogLevel =  "silly" | "debug" | "verbose" | "info" | "warning" | "error";

const rotateFilename = "bot-%DATE%.log";

/**
 * A wrapper for the winston logger with predefined transports.
 */
export class BotLogger {
    private logger: Logger;

    /**
     * Constructor that internally creates a new winston logger.
     */
    constructor(private logDir: string, logLevel: LogLevel) {
        fsx.ensureDirSync(logDir);
        this.logger = createLogger({
            format: format.combine(
                format.timestamp(),
                format.colorize(),
                format.printf(({message, level, timestamp}) => `${timestamp} [${level}] ${message}`),
            ),
            level: logLevel,
            transports: this.transports,
        });
    }

    /**
     * logs with the silly level
     * @param message
     * @param args
     */
    public silly(message: string, ...args: any) {
        this.logger.silly(message, ...args);
    }

    /**
     * logs with the debug level
     * @param message
     * @param args
     */
    public debug(message: string, ...args: any) {
        this.logger.debug(message, ...args);
    }

    /**
     * logs with the verbose level
     * @param message
     * @param args
     */
    public verbose(message: string, ...args: any) {
        this.logger.verbose(message, ...args);
    }

    /**
     * logs with the info level
     * @param message
     * @param args
     */
    public info(message: string, ...args: any) {
        this.logger.info(message, ...args);
    }

    /**
     * logs with the warning level
     * @param message
     * @param args
     */
    public warning(message: string, ...args: any) {
        this.logger.warning(message, ...args);
    }

    /**
     * logs with the error level
     * @param message
     * @param args
     */
    public error(message: string, ...args: any) {
        this.logger.error(message, ...args);
    }

    /**
     * logs an error with stack
     * @param error
     */
    public errorReport(error: Error) {
        this.error(error.message);
        this.debug(error.stack);
    }

    /**
     * The transports of the bot logger
     */
    private get transports(): Transport[] {
        return [
            new transports.Console(),
            new DailyRotateFile({
                datePattern: "YYYY-MM-DD-HH",
                filename: path.join(this.logDir, rotateFilename),
                maxFiles: "14d",
                maxSize: "20m",
                zippedArchive: true,
            }),
        ];
    }
}

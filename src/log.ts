import { OutputChannel, window } from "vscode";

export enum LogLevel {
    Info = "info",
    Debug = "debug",
    Warn = "warn",
    Error = "error",
    Fatal = "fatal",
}
export interface LoggingService {
    log(message: string, level: LogLevel): void;
    logInfo(message: string): void;
    logDebug(message: string): void;
    logWarn(message: string): void;
    logError(message: string): void;
    logFatal(message: string): void;
}

export class MixalLoggingService implements LoggingService {
    private readonly outputChannel: OutputChannel;

    public constructor(channelName: string) {
        this.outputChannel = window.createOutputChannel(channelName);
    }

    public log(message: string, level: LogLevel): void {
        const timestamp = new Date().toLocaleTimeString(undefined, {
            hour12: false,
        });

        this.outputChannel.appendLine(`${timestamp} [${level}] ${message}`);
    }

    public logInfo(message: string) {
        this.log(message, LogLevel.Info);
    }

    public logDebug(message: string): void {
        this.log(message, LogLevel.Debug);
    }

    public logWarn(message: string): void {
        this.log(message, LogLevel.Warn);
    }

    public logError(message: string): void {
        this.log(message, LogLevel.Error);
    }

    public logFatal(message: string): void {
        this.log(message, LogLevel.Fatal);
    }
}

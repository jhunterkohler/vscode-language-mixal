import { ExtensionContext, languages } from "vscode";
import { MixalFormattingEditProvider } from "./format";
import { MixalLoggingService } from "./log";

export function activate(_context: ExtensionContext) {
    const loggingService = new MixalLoggingService("MIXAL");

    languages.registerDocumentFormattingEditProvider(
        { scheme: "file", language: "mixal" },
        new MixalFormattingEditProvider(loggingService)
    );

    loggingService.logInfo("MIX assembly language support loaded.");
}

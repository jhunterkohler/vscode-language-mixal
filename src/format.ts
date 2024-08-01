import {
    DocumentFormattingEditProvider,
    DocumentRangeFormattingEditProvider,
    TextDocument,
    TextEdit,
    TextLine,
    Range,
} from "vscode";
import { LoggingService } from "./log";

export class MixalFormattingEditProvider
    implements
        DocumentFormattingEditProvider,
        DocumentRangeFormattingEditProvider
{
    public constructor(private loggingService: LoggingService) {}

    public provideDocumentFormattingEdits(document: TextDocument): TextEdit[] {
        this.loggingService.logInfo(
            `Formatting document '${document.fileName}'.`
        );

        return this.formatLines(document, 0, document.lineCount);
    }

    public provideDocumentRangeFormattingEdits(
        document: TextDocument,
        range: Range
    ): TextEdit[] {
        this.loggingService.logInfo(
            `Formatting selection of document '${document.fileName}'.`
        );

        return this.formatLines(
            document,
            range.start.line,
            range.end.line + 1
        );
    }

    private formatLines(
        document: TextDocument,
        start: number,
        stop: number
    ): TextEdit[] {
        const edits = [];
        for (let i = start; i < stop; ++i) {
            const edit = this.getLineEdit(document.lineAt(start + i));
            if (edit) {
                edits.push(edit);
            }
        }
        return edits;
    }

    private getLineEdit(line: TextLine): undefined | TextEdit {
        if (line.isEmptyOrWhitespace || line.text[0] == "*") {
            return undefined;
        }

        const { loc, op, afterOp } = line.text.match(
            /^(?<loc>\S+)?\s+(?<op>\S+)(?<afterOp>.*)$/
        )!.groups!;

        const newLoc = (loc || "").padEnd(10);
        const newOp = (op || "").padEnd(4);
        const newAfterOp = (afterOp || "").trim();
        const newText = `${newLoc} ${newOp} ${newAfterOp}`;

        return TextEdit.replace(line.range, newText);
    }
}

// @ts-ignore
import fs from 'fs';

class ParsedFile {
    private sourceCodeLines: string[];
    private commentLines: string[];

    constructor(private fileString: string, private commentIdentifier: string) {
        this.fileString = fileString;
        this.commentIdentifier = commentIdentifier;
        let parseFileResult = this.parseFile(fileString);
        // this.sourceCodeLines = [];
        // this.commentLines= [];
        this.sourceCodeLines = parseFileResult[0];
        this.commentLines= parseFileResult[1];
    }

    public getSourceCodeLines(): string[] {
        return this.sourceCodeLines;
    }

    public getCommentLines(): string[] {
        return this.commentLines;
    }

    private parseFile(fileString: string): string[][] {

        let sourceCodeLines = [];
        let commentLines = [];

        let fileSplitOnNewLine = fileString.split('\n');
        let insideBlockComment = false;

        for (let ind = 0; ind < fileSplitOnNewLine.length; ind ++) {
            
            if (insideBlockComment) {
                sourceCodeLines.push('');
                commentLines.push(fileSplitOnNewLine[ind]);
                continue;
            }

            let inlineComment = fileSplitOnNewLine[ind].indexOf("//");
            let startBlockComment  = fileSplitOnNewLine[ind].indexOf("/*");
            let endBlockComment = fileSplitOnNewLine[ind].indexOf("*/");

            if (!(inlineComment >= 0 || startBlockComment >= 0 || insideBlockComment)) {
                sourceCodeLines.push(fileSplitOnNewLine[ind]);
                commentLines.push('');
            } else if (inlineComment >= 0 && !insideBlockComment) {
                let sourceCodeStr = fileSplitOnNewLine[ind].slice(0, inlineComment);
                let commentStr = fileSplitOnNewLine[ind].slice(inlineComment);
                sourceCodeLines.push(sourceCodeStr);
                commentLines.push(commentStr);
            } else if (startBlockComment >= 0) {
                insideBlockComment = true;
                sourceCodeLines.push('');
                commentLines.push('');
            } else if (endBlockComment > 0) {
                insideBlockComment = false;
                sourceCodeLines.push('');
                commentLines.push('');
            }
        }
        return [sourceCodeLines, commentLines];
    }
}

export default ParsedFile;

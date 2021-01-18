/**
 * Parsed File class. The main functionality of thise class is to take a file and parse it into two
 * arrays of comment lines and code lines. 
 * 
 * Each array will be indexed by line number, starting at 0. array[i] represents the code or comment 
 * on line i of the file. A line, i, with both comments and code on it will have text in the ith index
 */
class ParsedFile {
    private sourceCodeLines: string[];
    private commentLines: string[];
    private wordsToIgnore: string[] = []; // words that will be removed before sending data back to DetectionEngine

    constructor(private fileString: string, private commentIdentifier: string, private fileStringsToIgnore: any[]) {
        this.populateWordsToIgnore(fileStringsToIgnore); // read in from paremeter passed to object
        this.fileString = fileString; // the file to be parsed in string format
        let parseFileResult = this.parseFile(fileString); // parse file so we can assign arrays to source and comment lines
        this.sourceCodeLines = parseFileResult[0];
        this.commentLines= parseFileResult[1];
    }

    /**
     * Getter for source code
     */
    public getSourceCodeLines(): string[] {
        return this.sourceCodeLines;
    }

    /**
     * Getting for comment code
     */
    public getCommentLines(): string[] {
        return this.commentLines;
    }

    /**
     * 
     * @param fileString Parse the file into source code array and comment array
     */
    private parseFile(fileString: string): string[][] {

        let sourceCodeLines = [];
        let commentLines = [];

        let fileSplitOnNewLine = fileString.split('\n'); // split file by newline so we have each line 

        let insideBlockComment = false; // flag to indicate if given line is inside of a block comment

        for (let ind = 0; ind < fileSplitOnNewLine.length; ind ++) { // for each line in file...

            // look for comment identifiers in the line
            let startBlockComment  = fileSplitOnNewLine[ind].indexOf("/*");
            let endBlockComment = fileSplitOnNewLine[ind].indexOf("*/");
            let inlineComment = fileSplitOnNewLine[ind].indexOf("//");

            fileSplitOnNewLine[ind] = fileSplitOnNewLine[ind].replace(';', ''); // remove semi-colon 

            // here we are removing words to ignore fom line...
            if (inlineComment > -1) {
                // if line contains inline comment, call private helper method to remove words to ignore
                // only from code, not comment 
                fileSplitOnNewLine[ind] = this.removeWordsToIgnoreOnlyBeforeInlineComment(fileSplitOnNewLine[ind]).trim()
            } else if (!insideBlockComment) {
                // if line is not inside of a block comment, remove all words to ignore from line

                this.wordsToIgnore.forEach((word: string) => {

                    word = word.replace(/[^\w\s]/gi, '');

                    let regexPattern = '\\b' + word + '\\b';
                    // let regexPattern = "[^a-zA-Z]" + word + "[^a-zA-Z]";

                    fileSplitOnNewLine[ind] = fileSplitOnNewLine[ind].replace(new RegExp(regexPattern), '');
                    fileSplitOnNewLine[ind] = fileSplitOnNewLine[ind].trim()
                });
            }
            
            // recalculate indexes of comment identifiers after removing words to ignore...
            startBlockComment  = fileSplitOnNewLine[ind].indexOf("/*");
            endBlockComment = fileSplitOnNewLine[ind].indexOf("*/");
            inlineComment = fileSplitOnNewLine[ind].indexOf("//");

            // if this line doesn't contain any letters...
            if (!fileSplitOnNewLine[ind].match(/[a-z]/i)) {
                // we dont care about symbols
                sourceCodeLines.push('');
                commentLines.push('');

                // check if line was beginning of end of a block comment
                if (startBlockComment > -1) {
                    insideBlockComment = true
                } else if (endBlockComment > -1) {
                    insideBlockComment = false;
                }
                continue; // next line...
            }

            // if line inside of block comment
            if (insideBlockComment) {
                sourceCodeLines.push(''); // no code
                commentLines.push(fileSplitOnNewLine[ind].trim()); 
                if (endBlockComment > -1) {
                    insideBlockComment = false;
                } else {
                    insideBlockComment = true;
                }
                continue;
            }

            // if no inline comment, no start block comment and not inside block comment...
            if (!(inlineComment >= 0) && !(startBlockComment >= 0) && !insideBlockComment) {
                sourceCodeLines.push(fileSplitOnNewLine[ind]);
                commentLines.push('');
            // if there is an inline comment and not inside block comment...
            } else if (inlineComment >= 0 && !insideBlockComment) {
                let sourceCodeStr = fileSplitOnNewLine[ind].slice(0, inlineComment);
                let commentStr = fileSplitOnNewLine[ind].slice(inlineComment);
                sourceCodeLines.push(sourceCodeStr);
                commentLines.push(commentStr);
            // start block comment means push empty strings...
            } else if (startBlockComment >= 0) {
                insideBlockComment = true;
                sourceCodeLines.push('');
                commentLines.push('');
            // end block comment means push empty strings
            } else if (endBlockComment >= 0) {
                insideBlockComment = false;
                sourceCodeLines.push('');
                commentLines.push('');
            }
        }
        // return the arrays as a 'tuple'
        return [sourceCodeLines, commentLines];
    }

    /**
     * helper function to populat words to ignore array from user inputted files
     * @param fileStrings 
     */
    private populateWordsToIgnore(fileStrings: Array<string>): void {
        let os = require('os');

        fileStrings.forEach(fileString => {
            let wordsToIgnoreSet = new Set();
            fileString.split(os.EOL).forEach((line: string)=> wordsToIgnoreSet.add(line.trim()));    
            wordsToIgnoreSet.forEach((word:string) => this.wordsToIgnore.push(word))
        });

        // sort the array because when actually removing the words, need to remove longer words first
        // example where this is neccessary: removing const before constructor will leave word 'ructor'
        this.wordsToIgnore.sort((w1: string, w2: string) => w2.length - w1.length);

    };

    /**
     * Helper function for removing words to ignore from lines with code and inline comment 
     * @param stringToOperateOn 
     */
    private removeWordsToIgnoreOnlyBeforeInlineComment(stringToOperateOn: string): string {
        let stringSplit = stringToOperateOn.split('//'); // split line on the comment 
        
        let codeStr = '';
        let commentStr = '';

        if (!stringSplit[0].startsWith('//')) { // if comment ifentifier not on first col of line
            codeStr = stringSplit[0];
            commentStr = stringSplit[1];

            // replace words to ignore in codeStr with ''
            this.wordsToIgnore.forEach((word: string) => {

                word = word.replace(/[^\w\s]/gi, '');
                let regexPattern = '\\b' + word + '\\b';
                codeStr = codeStr.replace(new RegExp(regexPattern), '');
            })
            // put the string back together and return
            return codeStr.concat("//".concat(commentStr));
        }
        // return original string
        return stringToOperateOn;
    }
}

export default ParsedFile;

import {expect} from 'chai';
import ParsedFile from '../../model/plagiarism-detection/ParsedFile'
import * as fs from "fs";

describe('tests for ParsedFile on files with one line', () => {

    it('test that ParsedFile parses single line file with no comments correctly', () => {
        let parsedFileTest = new ParsedFile(fs.readFileSync('/Users/magurman/Library/Mobile Documents/com~apple~CloudDocs/ALIGN/CS 5500/Team-07/das-yarn-express-ts/src/test/mockFiles/singleLineNoComments.js', 'utf-8'), "//",[fs.readFileSync("src/model/programmingLanguageKeywords/JavaScriptKeywords.txt", 'utf-8')]);
        let srcLines = parsedFileTest.getSourceCodeLines();
        let commentLines = parsedFileTest.getCommentLines();

        expect(srcLines).to.eql(["x = 4"])
        expect(commentLines).to.eql([""])
    });

    it('test that ParsedFile parses single line file with only comments correctly', () => {
        let parsedFileTest = new ParsedFile(fs.readFileSync('/Users/magurman/Library/Mobile Documents/com~apple~CloudDocs/ALIGN/CS 5500/Team-07/das-yarn-express-ts/src/test/mockFiles/singleLineOnlyComment.js','utf-8'), "//",[fs.readFileSync("src/model/programmingLanguageKeywords/JavaScriptKeywords.txt", 'utf-8')]);
        let srcLines = parsedFileTest.getSourceCodeLines();
        let commentLines = parsedFileTest.getCommentLines();

        expect(srcLines).to.eql([""])
        expect(commentLines).to.eql(["// this is only a comment"])
    });

    it('test that ParsedFile parses single line file with comments and src code', () => {
        let parsedFileTest = new ParsedFile(fs.readFileSync('/Users/magurman/Library/Mobile Documents/com~apple~CloudDocs/ALIGN/CS 5500/Team-07/das-yarn-express-ts/src/test/mockFiles/singleLineCommentAndSrc.js', 'utf-8'),"//",[fs.readFileSync("src/model/programmingLanguageKeywords/JavaScriptKeywords.txt", 'utf-8')]);
        let srcLines = parsedFileTest.getSourceCodeLines();
        let commentLines = parsedFileTest.getCommentLines();

        expect(srcLines).to.eql(["test = true "])
        expect(commentLines).to.eql(["// test = true"])
    });

    it('test that ParsedFile parses multiple line file with comments and src code', () => {
        let parsedFileTest = new ParsedFile(fs.readFileSync('/Users/magurman/Library/Mobile Documents/com~apple~CloudDocs/ALIGN/CS 5500/Team-07/das-yarn-express-ts/src/test/mockFiles/multipleLineCommentAndSrc.js', 'utf-8'),"//",[fs.readFileSync("src/model/programmingLanguageKeywords/JavaScriptKeywords.txt", 'utf-8')]);
        let srcLines = parsedFileTest.getSourceCodeLines();
        let commentLines = parsedFileTest.getCommentLines();

        expect(srcLines).to.eql(['test = true ', '', "fail = false"])
        expect(commentLines).to.eql(["// test = true", "// fail = false", ''])
    });

    it('test that ParsedFile parses multiple line file with block comments', () => {
        let parsedFileTest = new ParsedFile(fs.readFileSync('/Users/magurman/Library/Mobile Documents/com~apple~CloudDocs/ALIGN/CS 5500/Team-07/das-yarn-express-ts/src/test/mockFiles/multipleLineBlockComments.js', 'utf-8'),"//",[fs.readFileSync("src/model/programmingLanguageKeywords/JavaScriptKeywords.txt", 'utf-8')]);
        let srcLines = parsedFileTest.getSourceCodeLines();
        let commentLines = parsedFileTest.getCommentLines();

        expect(srcLines).to.eql(['', '', '', '',"x = 4"])
        expect(commentLines).to.eql(["", "This is a block comment", "Multiple Lines will be ignored by the JavaScript compiler", '', ''])
    });

    it('test that ParsedFile parses file with lines that only contain symbols', () => {
        let parsedFileTest = new ParsedFile(fs.readFileSync('/Users/magurman/Library/Mobile Documents/com~apple~CloudDocs/ALIGN/CS 5500/Team-07/das-yarn-express-ts/src/test/mockFiles/fileWithLinesThatOnlyContainSymbols.js', 'utf-8'),"//",[fs.readFileSync("src/model/programmingLanguageKeywords/JavaScriptKeywords.txt", 'utf-8')]);
        let srcLines = parsedFileTest.getSourceCodeLines();
        let commentLines = parsedFileTest.getCommentLines();

        expect(srcLines).to.eql(['Performer { ', '', '', '',"", '', '', ''])
        expect(commentLines).to.eql(["// a performer will only perform", "", "constructor will return this", '', '', '', '', ''])
    })
})
import {expect} from 'chai';
import ParsedFile from './ParsedFile'

describe('tests for ParsedFile on files with one line', () => {

    it('test that ParsedFile parses single line file with no comments correctly', () => {
        let parsedFileTest = new ParsedFile('/Users/magurman/Library/Mobile Documents/com~apple~CloudDocs/ALIGN/CS 5500/Team-07/das-yarn/test/parsingTestFiles/singleLineNoComments.js', "//");
        let srcLines = parsedFileTest.getSourceCodeLines();
        let commentLines = parsedFileTest.getCommentLines();

        expect(srcLines).to.eql(["const x = 4;"])
        expect(commentLines).to.eql([""])
    });

    it('test that ParsedFile parses single line file with only comments correctly', () => {
        let parsedFileTest = new ParsedFile('/Users/magurman/Library/Mobile Documents/com~apple~CloudDocs/ALIGN/CS 5500/Team-07/das-yarn/test/parsingTestFiles/singleLineOnlyComment.js', "//");
        let srcLines = parsedFileTest.getSourceCodeLines();
        let commentLines = parsedFileTest.getCommentLines();

        expect(srcLines).to.eql([""])
        expect(commentLines).to.eql(["// this is only a comment"])
    });

    it('test that ParsedFile parses single line file with comments and src code', () => {
        let parsedFileTest = new ParsedFile('/Users/magurman/Library/Mobile Documents/com~apple~CloudDocs/ALIGN/CS 5500/Team-07/das-yarn/test/parsingTestFiles/singleLineCommentAndSrc.js', "//");
        let srcLines = parsedFileTest.getSourceCodeLines();
        let commentLines = parsedFileTest.getCommentLines();

        expect(srcLines).to.eql(["let test = true; "])
        expect(commentLines).to.eql(["// test = true"])
    });
})
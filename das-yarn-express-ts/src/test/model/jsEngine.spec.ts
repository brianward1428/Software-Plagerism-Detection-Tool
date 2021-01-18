import {expect} from 'chai';
import CodeStringSimMatchFactory from '../../model/plagiarism-detection/CodeStringSimMatchFactory';
import JavaScriptDetectionEngine from '../../model/plagiarism-detection/JavaScriptDetectionEngine';
import ProgrammingLanguage from '../../model/plagiarism-detection/ProgrammingLanguage';
import ProgrammingLanguageEnum from '../../model/plagiarism-detection/ProgrammingLanguageEnum';
import SorensenDiceSim from '../../model/plagiarism-detection/SorensenDiceSim';

describe("tests for jsEngine Match creator", () => {

    let jsEngine = new JavaScriptDetectionEngine(new ProgrammingLanguage(ProgrammingLanguageEnum.JAVASCRIPT,"//",[]))

    it("test on identical files", () => {
        let str1 = ["hello", "my", "name", "is", "das", "yarn"]
        let str2 = ["hello", "my", "name", "is", "das", "yarn"]
        let matches = jsEngine.getStringSimMatches(0,0,str1,str2,new SorensenDiceSim(),new CodeStringSimMatchFactory(),.9)
        expect(matches.length).to.equal(1)
        let match = matches[0]
        expect(match.getLocationP1().getStartLine()).to.eql(0)
        expect(match.getLocationP1().getEndLine()).to.eql(5)

        expect(match.getLocationP2().getStartLine()).to.eql(0)
        expect(match.getLocationP2().getEndLine()).to.eql(5)
    })

    it("test on files with more than one match of length > 1 line", () => {
        let str1 = ["hello", "my", "name", "", "das", "yarn"]
        let str2 = ["hello", "my", "name", "", "das", "yarn"]
        let matches = jsEngine.getStringSimMatches(0,0,str1,str2,new SorensenDiceSim(),new CodeStringSimMatchFactory(),.9)
        expect(matches.length).to.equal(2)
        let match1 = matches[0]
        expect(match1.getLocationP1().getStartLine()).to.eql(0)
        expect(match1.getLocationP1().getEndLine()).to.eql(2)

        expect(match1.getLocationP2().getStartLine()).to.eql(0)
        expect(match1.getLocationP2().getEndLine()).to.eql(2)

        let match2 = matches[1]
        expect(match2.getLocationP1().getStartLine()).to.eql(4)
        expect(match2.getLocationP1().getEndLine()).to.eql(5)

        expect(match2.getLocationP2().getStartLine()).to.eql(4)
        expect(match2.getLocationP2().getEndLine()).to.eql(5)
    });

    it("test on files with more than one match and file 1 is longer than file 2", () => {
        let str1 = ["","dasyarn","hello", "my", "name", "", "das", "yarn"]
        let str2 = ["hello", "my", "name", "", "das", "yarn"]
        let matches = jsEngine.getStringSimMatches(0,0,str1,str2,new SorensenDiceSim(),new CodeStringSimMatchFactory(),.9)
        expect(matches.length).to.equal(2)
        let match1 = matches[0]
        expect(match1.getLocationP1().getStartLine()).to.eql(2)
        expect(match1.getLocationP1().getEndLine()).to.eql(4)

        expect(match1.getLocationP2().getStartLine()).to.eql(0)
        expect(match1.getLocationP2().getEndLine()).to.eql(2)

        let match2 = matches[1]
        expect(match2.getLocationP1().getStartLine()).to.eql(6)
        expect(match2.getLocationP1().getEndLine()).to.eql(7)

        expect(match2.getLocationP2().getStartLine()).to.eql(4)
        expect(match2.getLocationP2().getEndLine()).to.eql(5)
    });

    it("test on files with more than one match and file 1 is longer than file 2", () => {
        let str2 = ["","dasyarn","hello", "my", "name", "", "das", "yarn"]
        let str1 = ["hello", "my", "name", "", "das", "yarn"]
        let matches = jsEngine.getStringSimMatches(0,0,str1,str2,new SorensenDiceSim(),new CodeStringSimMatchFactory(),.9)
        expect(matches.length).to.equal(2)
        let match1 = matches[0]
        expect(match1.getLocationP1().getStartLine()).to.eql(0)
        expect(match1.getLocationP1().getEndLine()).to.eql(2)

        expect(match1.getLocationP2().getStartLine()).to.eql(2)
        expect(match1.getLocationP2().getEndLine()).to.eql(4)

        let match2 = matches[1]
        expect(match2.getLocationP1().getStartLine()).to.eql(4)
        expect(match2.getLocationP1().getEndLine()).to.eql(5)

        expect(match2.getLocationP2().getStartLine()).to.eql(6)
        expect(match2.getLocationP2().getEndLine()).to.eql(7)
    });
})
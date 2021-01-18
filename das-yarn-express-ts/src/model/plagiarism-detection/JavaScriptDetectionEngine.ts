import IDetectionEngine from "./IDetectionEngine";
import Project from "../Project";
import ParsedFile from "./ParsedFile";
import AbstractDetectionEngine from "./AbstractDetectionEngine";
import ProgrammingLanguage from "./ProgrammingLanguage";
import IMatchFactory from "../IMatchFactory";
import IPlagiarismMatch from "../IPlagiarismMatch";
import ProgrammingLanguageEnum from "./ProgrammingLanguageEnum";
import SorensenDiceSim from "./SorensenDiceSim";
import IStringSimilarity from "./IStringSimilarity"
/**
 * Concrete class for a JavaScript Detection Engine for the Plagiarism Detector
 * 
 * A 'JavaScript Detection Engine' is a plagiarism detection engine used for JavaScript programs 
 */
class JavaScriptDetectionEngine extends AbstractDetectionEngine {

    simResults_Comments: object[] = [];
    simResults_Code: object[] = [];


    constructor(programmingLanguage: ProgrammingLanguage = new ProgrammingLanguage(ProgrammingLanguageEnum.JAVASCRIPT, '//', [] )) {
            super(programmingLanguage);
        }

    /**
     * So this will be our work horse
     * @param p1 Project 1 to be compared.
     * @param p2 Project 2 to be compared.
     */
    compare(p1: Project, p2: Project): void {

        /**
         * Okay, so we have our two projects now we can either build an AST or we can do our string compares.
         * Lets start with a simple string compare.
         *
         */

        // SO we want to iterate over all the ducuments in each project and collect the lines..
        let p1_Comments = [];
        let p1_SourceCoded = [];

        for (let file of p1.getDocuments()){
            let parsedDoc: ParsedFile = new ParsedFile(file, this.programmingLanguage.getCommentIdentifier())
            let myComments = parsedDoc.getCommentLines();
            let myCode = parsedDoc.getSourceCodeLines();

            p1_Comments = p1_Comments.concat(myComments);
            p1_SourceCoded = p1_SourceCoded.concat(myCode);

        }

        // NOW project 2

        let p2_Comments = [];
        let p2_SourceCoded = [];

        for (let file of p2.getDocuments()){
            let parsedDoc: ParsedFile = new ParsedFile(file, this.programmingLanguage.getCommentIdentifier())
            let myComments = parsedDoc.getCommentLines();
            let myCode = parsedDoc.getSourceCodeLines();

            p2_Comments = p2_Comments.concat(myComments);
            p2_SourceCoded = p2_SourceCoded.concat(myCode);
        }

        // okay now we have the two lists. lets go ahead and compare the values with a string-Sim algorithm.

        let simCalc : IStringSimilarity = new SorensenDiceSim();

        /**
         * COMMENTS FIRST
         */

        for(let keyA in  p1_Comments){
           for(let keyB in  p2_Comments){

              let result = {keyA: keyA,
                             keyB : keyB,
                             simVal : simCalc.compare(p1_Comments[keyA], p2_Comments[keyB]),
                          }
               this.simResults_Comments.push(result)
        }
        }

        /**
         * CODE LINES :
         */

        for(let keyA in  p1_SourceCoded){
            for(let keyB in  p2_SourceCoded){

                let result = {keyA: keyA,
                    keyB : keyB,
                    simVal : simCalc.compare(p1_SourceCoded[keyA], p1_SourceCoded[keyB]),
                }
                this.simResults_Code.push(result)
            }
        }



    }

    createMatch(matchFactory: IMatchFactory): IPlagiarismMatch {
        throw new Error("Method not implemented.");
    }

    /**
     * For now were just going to return a string summary of the matches..
     */
    getSummary(): string {

        // COMMENTS
        let CommentCount_1 = 0;
        let CommentCount_G_08 = 0;

        for(let record of this.simResults_Comments){

            if (Math.abs(record['simVal'] - 1.0) < Number.EPSILON) {
                CommentCount_1 ++;
            }
            if (record['simVal'] >= 0.8) {
                CommentCount_G_08 ++;
            }
        }
        // lets calculate the average score of all the comments:
        let average_CommentsScore =  this.simResults_Comments.map(record => record['simVal']).reduce((a, b) => a + b) / this.simResults_Comments.length;


        // NOW CODE
        let CodeCount_1 = 0;
        let CodeCount_G_08 = 0;

        for(let record of this.simResults_Code){

            if (Math.abs(record['simVal'] - 1.0) < Number.EPSILON) {
                CodeCount_1 ++;
            }
            if (record['simVal'] >= 0.8) {
                CodeCount_G_08 ++;
            }
        }

        // lets calculate the average score of all the comments:
        let average_CodeScore =  this.simResults_Code.map(record => record['simVal']).reduce((a, b) => a + b) / this.simResults_Code.length;


        return "SUMMARY : \n"
                + "Number of Comment lines with exact matches : " + CommentCount_1.toString(10) + " \n"
                + "Number of Comment lines with simValue => 0.8 : " + CommentCount_G_08.toString(10) + " \n"
                + "Average simValue of comment lines : " + average_CommentsScore.toString(10) + " \n"

                + "Number of Code lines with exact matches : " + CodeCount_1.toString(10) + " \n"
                + "Number of Code lines with simValue => 0.8 : " + CodeCount_G_08.toString(10) + " \n"
                + "Average simValue of code lines : " + average_CodeScore.toString(10) + " \n"

    }

    getSimResults_Code(): object[] {
        return this.simResults_Code;
    }

    getSimResults_Comments(): object[] {
        return this.simResults_Comments;
    }


}



export default JavaScriptDetectionEngine

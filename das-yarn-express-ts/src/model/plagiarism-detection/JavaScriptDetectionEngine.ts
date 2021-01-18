import Project from "./Project";
import ParsedFile from "./ParsedFile";
import AbstractDetectionEngine from "./AbstractDetectionEngine";
import ProgrammingLanguage from "./ProgrammingLanguage";
import IMatchFactory from "./IMatchFactory";
import IPlagiarismMatch from "./IPlagiarismMatch";
import ProgrammingLanguageEnum from "./ProgrammingLanguageEnum";
import SorensenDiceSim from "./SorensenDiceSim";
import IStringSimilarity from "./IStringSimilarity"
import Location from "./Location";
import CommentStringSimMatchFactory from "./CommentStringSimMatchFactory"
import CodeStringSimMatchFactory from "./CodeStringSimMatchFactory";
import * as fs from "fs";
var esprima = require('esprima');
var estraverse = require('estraverse');

/**
 * Concrete class for a JavaScript Detection Engine for the Plagiarism Detector.
 * A 'JavaScript Detection Engine' is a plagiarism detection engine used for JavaScript programs.
 */

class JavaScriptDetectionEngine extends AbstractDetectionEngine {

    constructor(programmingLanguage: ProgrammingLanguage = 
        new ProgrammingLanguage(ProgrammingLanguageEnum.JAVASCRIPT, '//', [] ), 
        protected matches: IPlagiarismMatch[] = [], protected literalSimValue: number = -1, 
        protected identifierSimValue: number = -1) {
            super(programmingLanguage, matches, literalSimValue, identifierSimValue);
        }

         /**
         * Helper that will take two arrays of strings and compare them against one another. 
         * Using the StringSimCaculator given, and will create IPlagerism Matches via the given IMatchFactory.
         * @param p1_fileId  file id for p1.
         * @param p2_fileId  file id for P2.
         * @param P1_lines array of strings for P1.
         * @param P2_lines array of strings for P2.
         * @param SimCalc string similarity Calculator
         * @param matchFactory ImatchFactory used for creating plagerism Matches.
         * @param THRESHOLD threshold value of similarity which we will treat as the lower bound for a Match.
         */
    getStringSimMatches(p1_fileId: number, p2_fileId: number, P1_lines: string[], P2_lines: string[], SimCalc: IStringSimilarity, matchFactory : IMatchFactory, THRESHOLD: number): IPlagiarismMatch[] {

        // matches that will be returned to the calling function
        let myMatches = []; 

        // 2d array stores flag variable. storedMatches[i][j] indicates a match at 
        // proj1, line i and proj2, line j. Will be used to group consecutive matches into one match
        let storedMatches: boolean[][] = new Array(P1_lines.length);

        // initialize 2d array 
        for (let i = 0; i < storedMatches.length; i ++) {
            storedMatches[i] = new Array(P2_lines.length);
        }

        // compare every line to every other line
        P1_lines.forEach((line1, index1) => {
            P2_lines.forEach((line2, index2) => {

                let simVal = SimCalc.compare(line1, line2); // get sim val for this line

                if (simVal > THRESHOLD) {
                    // if lines are similar, flag as match and continue moving
                    // we dont want to create a match obj until we know the next line ISNT a match
                    storedMatches[index1][index2] = true; 
                } else {
                    // lines are not similar, flag as no match
                    storedMatches[index1][index2] = false;

                    // if previous line was match, we must then find the last non-match line pair 
                    // in order to create match object
                    if (index1 - 1 >=0 && index2-1 >=0 && storedMatches[index1 - 1][index2 - 1]) {
                        // helper function gets last non-match line pair
                        let indexesOfLastNonMatch: number[] = this.findIndexesOfLastNonMatch(storedMatches, index1 - 1, index2 - 1);
                        
                        // create locations of each match using current indexes and index of 
                        // last non-match line pair
                        let location1 = new Location(p1_fileId, indexesOfLastNonMatch[0],index1 - 1);
                        let location2 = new Location(p2_fileId, indexesOfLastNonMatch[1], index2 - 1);
                        
                        // add match to collection
                        myMatches.push(matchFactory.createMatch(location1, location2, simVal)); // what do to with sim value here? 
                    }
                }

                // these next two conditional blocks cover cases where the last line in a file was a
                // match. we must consider these separately because the logic above only 
                // creates a match once a non-match line pair has been reached -- which never happens
                // if the last line in a file is a match
                if (index2 === P2_lines.length - 1 && simVal > THRESHOLD) {

                    let indexesOfLastNonMatch: number[] = this.findIndexesOfLastNonMatch(storedMatches, index1, index2);
                    let location1 = new Location(p1_fileId, indexesOfLastNonMatch[0],index1 );
                    let location2 = new Location(p2_fileId, indexesOfLastNonMatch[1], index2);
                    myMatches.push(matchFactory.createMatch(location1, location2, simVal));
                }

                if (index1 === P1_lines.length - 1 && simVal > THRESHOLD && !(index2 === P2_lines.length - 1)) {

                    let indexesOfLastNonMatch: number[] = this.findIndexesOfLastNonMatch(storedMatches, index1, index2);
                    let location1 = new Location(p1_fileId, indexesOfLastNonMatch[0],index1 );
                    let location2 = new Location(p2_fileId, indexesOfLastNonMatch[1], index2);
                    myMatches.push(matchFactory.createMatch(location1, location2, simVal));
                }
            });
        });

        return myMatches;
    }

    /**
     * Helper function that finds the last line-pair without a match
     * @param storedMatches -- 2d array storing all past combinations of line pairings
     * @param startIndexP1 -- line in file 1 with last match
     * @param startIndexP2 -- line in file 2 with last match
     */
    private findIndexesOfLastNonMatch(storedMatches: boolean[][], startIndexP1: number, startIndexP2: number): number[] {

        // flags to keep track if we hit the beginning of a file 
        let flag1: boolean = false;
        let flag2: boolean = false;
        
        // while last line pair was a match...
        while (storedMatches[startIndexP1][startIndexP2]) {

            // decrement indexes so we can check previous line pair
            if (startIndexP1 > 0) {
                startIndexP1--;
            }
            if (startIndexP2 > 0) {
                startIndexP2--;
            }

            // flip flag if we reach index 0 in either file
            if (startIndexP1 === 0) {
                flag1 = true;
            }
            if (startIndexP2 === 0) {
                flag2 = true;
            }

            // we are done here...
            if (startIndexP2 === 0 && startIndexP1 === 0) {
                break;
            }
        }

        // in absence of flag, we must return current index + 1 becauase we are interested in 
        // last match line, not first non-match line. 
        // flag indicates we never counted that extra line because we hit index 0
        return [flag1 ? startIndexP1 : startIndexP1 + 1 , flag2 ? startIndexP2 : startIndexP2 + 1]
    }

    /**
     * Get the nodes from an AST 
     * @param p project
     * @param nodeType 
     */
    private getNodesFromAST(p:Project, nodeType:string){

        let nodes :object[] = [];

        for(let file of p.getDocuments()) {


            let AST = esprima.parse(file);
            /**
             *  NOW WE WILL USE ESTRAVERSE TO TRAVERSE THE AST AND COLLEC THE DIFFERENT NODES.
             */
            estraverse.traverse(AST, {
                enter: function (node:any, parent:any) {
                    if (node.type == 'FunctionExpression' || node.type == 'FunctionDeclaration')
                        return estraverse.VisitorOption.Skip;
                },
                leave: function (node:any, parent:any) {

                    switch(node.type) {

                        case nodeType: {

                            nodes.push(node);
                            break;
                        }

                        default: {
                            // we will just ignore anything else.
                            break;
                        }
                    }
                }
            });
            return nodes;
        }
    }

    /**
     * Compare the AST Nodes from the two projects to calcualte literal and identifier 
     * similarity values 
     * @param p1 project 1
     * @param p2 project 2
     */
    private compareAST(p1: Project, p2: Project): void {
        /**
          *      We are going to just do the whole project here.
         *      - were going to use sets.
         */
        let Identifiers_P1: Set<string> = new Set();
        let Identifiers_P2: Set<string> = new Set();
        let Literals_P1: Set<string> = new Set();
        let Literals_P2: Set<string> = new Set();

        for (let IdNode of this.getNodesFromAST(p1, 'Identifier')){
            // @ts-ignore
            Identifiers_P1.add(IdNode.name);
        }

        for (let IdNode of this.getNodesFromAST(p2, 'Identifier')){
            // @ts-ignore
            Identifiers_P2.add(IdNode.name);
        }

        for (let IdNode of this.getNodesFromAST(p1, 'Literal')){
            // @ts-ignore
            Literals_P1.add(IdNode.raw);
        }

        for (let IdNode of this.getNodesFromAST(p2, 'Literal')){
            // @ts-ignore
            Literals_P2.add(IdNode.raw);
        }

        /**
         * Now we will compute the Jaccard Index of set similarity of the two sets.
         */

        let literalUnionSize = new Set([...Array.from(Literals_P1), ...Array.from(Literals_P2)]).size;
        let IdentifierUnionSize = new Set([...Array.from(Identifiers_P1), ...Array.from(Identifiers_P2)]).size;

        let literalIntersectionSize = Array.from(Literals_P1).filter(x => Literals_P2.has(x)).length;
        let IdentifierIntersectionSize = Array.from(Identifiers_P1).filter(x => Identifiers_P2.has(x)).length;

        /**
         * Make sure that we dont make any divide by zero mistakes.
         */
        if (literalUnionSize !== 0){
            this.literalSimValue = literalIntersectionSize/literalUnionSize;
        } else {
            this.literalSimValue = -1;
        }

        if (IdentifierUnionSize !== 0){
            this.identifierSimValue = IdentifierIntersectionSize/IdentifierUnionSize;
        } else {
            this.identifierSimValue = -1;
        }
    }

    /**
     * So this will be our work horse of this class and will get all the necessary Matches. 
     * @param p1 Project 1 to be compared.
     * @param p2 Project 2 to be compared.
     * @param THRESHOLD : threshold of what sim value we will consider a match.
     */

    compare(p1: Project, p2: Project, THRESHOLD : number, ignoreFile: string): void {

        /**
         * Lets the the AST comarisons real quick.
         */
        try {
            this.compareAST(p1, p2);
        } catch (error) {
          console.log("there was an error parsing the AST of the program.")
        }

        /**
         * Start with the string Compares..
         *         So we need to:
         *         1: iterate over documents in each project.
         *         2: get the commentLines and codeLines
         *         3: compare for for matches.
         */

        //fileIDS -- differentiate files within projects
        let fileId_P1 = 0;
        let fileId_P2 = 0;

        // Read in our own file of words to ignore -- these are keywords in the given programming language
        let fileString = fs.readFileSync("src/model/programmingLanguageKeywords/JavaScriptKeywords.txt", 'utf-8');
        
        //project 1
        for (let file of p1.getDocuments()){
            // parse file and get comment lines and code lines broken into array of strings
            let parsedDoc: ParsedFile = new ParsedFile(file, this.programmingLanguage.getCommentIdentifier(), [fileString, ignoreFile]);
            let Comments_P1 = parsedDoc.getCommentLines();
            let Code_P1 = parsedDoc.getSourceCodeLines();

            // Project 2
            let fileId_P2 = 0;
            for (let file of p2.getDocuments()){
                // parse file and get comment lines and code lines broken into array of strings
                let parsedDoc: ParsedFile = new ParsedFile(file, this.programmingLanguage.getCommentIdentifier(), [fileString, ignoreFile]);
                let Comments_P2 = parsedDoc.getCommentLines();
                let Code_P2 = parsedDoc.getSourceCodeLines();

                let simCalc = new SorensenDiceSim();

                /**
                 * NOW LOOK FOR COMMENT MATCHES AND ADD THEM TO ALL MATCHES:
                 */
                let commentMatches = this.getStringSimMatches(fileId_P1, fileId_P2,Comments_P1, Comments_P2, simCalc, new CommentStringSimMatchFactory(), THRESHOLD);
                this.matches = this.matches.concat(commentMatches);
                /**
                 * NOW LOOK FOR CODE MATCHES AND ADD THEM TO ALL MATCHES:
                 */
                let codeMatches = this.getStringSimMatches(fileId_P1, fileId_P2,Code_P1, Code_P2, simCalc, new CodeStringSimMatchFactory(), THRESHOLD);
                this.matches = this.matches.concat(codeMatches);
                fileId_P2++;
            }
            fileId_P1++;
        }
    }
}

export default JavaScriptDetectionEngine;

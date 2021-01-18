import IMatchFactory from "./IMatchFactory";
import IPlagiarismMatch from "./IPlagiarismMatch";
import Project from "./Project";
import IDetectionEngine from "./IDetectionEngine";
import ProgrammingLanguage from "./ProgrammingLanguage";
import Results from "./Results";

/**
 * Abstract class for a detection engine. Abstracts common fields and methods shared 
 * by detection engines for all programming languages
 */
abstract class AbstractDetectionEngine implements IDetectionEngine {

    constructor(protected programmingLanguage: ProgrammingLanguage, protected matches: IPlagiarismMatch[] = [],
        protected literalSimValue: number = -1, protected identifierSimValue: number = -1) {
    }

    // delegate to concrete classes
    compare(p1: Project, p2: Project, THRESHOLD: number, ignoreFile: string): void {
        throw new Error("Method not implemented.");
    }

    // get results object from analysis
    getResults(): Results {
        return new Results(this.matches, this.literalSimValue, this.identifierSimValue);
    }
}
export default AbstractDetectionEngine;

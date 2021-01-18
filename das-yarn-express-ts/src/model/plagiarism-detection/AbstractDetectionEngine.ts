import IMatchFactory from "../IMatchFactory";
import IPlagiarismMatch from "../IPlagiarismMatch";
import Project from "../Project";
import IDetectionEngine from "./IDetectionEngine";
import ParsedFile from "./ParsedFile";
import ProgrammingLanguage from "./ProgrammingLanguage";

abstract class AbstractDetectionEngine implements IDetectionEngine {

    constructor(protected programmingLanguage: ProgrammingLanguage) {
        }
    // constructor(private programmingLanguage: ProgrammingLanguage,
    //             private projectOneFiles : Iterable<ParsedFile>, private projectTwoFiles : Iterable<ParsedFile>) {
    //     this.programmingLanguage = programmingLanguage;
    //     this.projectOneFiles = projectOneFiles;
    //     this.projectTwoFiles = projectTwoFiles;
    // }

    compare(p1: Project, p2: Project): void {
        throw new Error("Method not implemented.");
    }
    createMatch(matchFactory: IMatchFactory): IPlagiarismMatch {
        throw new Error("Method not implemented.");
    }

    /**
     * Get String Summary of results.
     */
    getSummary(): string {
        throw new Error("Method not implemented.");
    }
}
export default AbstractDetectionEngine;

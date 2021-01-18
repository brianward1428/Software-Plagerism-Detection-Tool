import IMatchFactory from '../IMatchFactory'
import IPlagiarismMatch from '../IPlagiarismMatch'
import Project from '../Project'
import ParsedFile from './ParsedFile'
import ProgrammingLanguage from './ProgrammingLanguageEnum'

/**
 * Interface that represents a DetectionEngine in the Plagiarism Detector.
 * 
 * A 'Detection Engine' is a container for the methods and algorithms involved 
 * in analyzing two code projects for instances of plagiarism
 */

interface IDetectionEngine {

    /**
     * Compare two projects
     * @param p1 project 1
     * @param p2 project 2
     */
    compare(p1: Project, p2 : Project): void;

    /**
     * Create a new plagiarism match
     * @param matchFactory a match factory object
     */
    createMatch(matchFactory : IMatchFactory) : IPlagiarismMatch;

    /**
     * Get String Summary of results.
     */
    getSummary(): string;

}

export default IDetectionEngine

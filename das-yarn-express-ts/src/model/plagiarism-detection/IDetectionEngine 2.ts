import Project from './Project'
import Results from "./Results";

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
    compare(p1: Project, p2 : Project, THRESHOLD: number, ignoreFile: string): void;

    /**
     * Get a results object for the submission.
     */
    getResults(): Results;

}

export default IDetectionEngine

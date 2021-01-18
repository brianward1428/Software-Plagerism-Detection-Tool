import Project from './Project'
import IDetectionEngine from './IDetectionEngine'
import IPerson from '../IPerson'
import IPlagiarismMatch from './IPlagiarismMatch'

/**
 * Interface that represents a Submission in the Plagiarism Detector.
 * 
 * A 'Submission' is a container for the data and methods related to the process
 * of submitting two projects for plagiarism analysis
 */
interface ISubmission {
    // the two projects to be compared
    project1 : Project;
    project2 : Project;

    // metadata
    dateCreated: Date;
    lastOpened: Date;
    owner: IPerson;

    // see IDetectionEngine for details
    detectionEngine : IDetectionEngine;
    
    // see IPlagiarismMatch for details
    matches: IPlagiarismMatch[];

    getSummary() : string;
    getMatches() : IPlagiarismMatch[];
    getProject1() : Project;
    getProject2() : Project;
    getDateCreated() : Date;
    getLastOpened() : Date;
    getOwner() : IPerson;

    // delete a match from a Submission
    deleteMatch(index: number) : void;
}

export default ISubmission

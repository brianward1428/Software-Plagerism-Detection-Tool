/**
 * Interface that represnts a Plagiarism Match in the Plagiarism Detector.
 * 
 * A 'Plagiarism Match' is a container for the data related to two flagged 
 * sections of code for manual plagiarism review
 */

interface IPlagiarismMatch {
    
    // will define a scale of severity that our system will assign
    severity: number; 
 
    // where the two sections of code are located in their projects
    locationP1 : Location;
    locationP2 : Location;

    toString() : string;
    getSeverity() : number;
    getLocationP1(): Location;
    getLocationP2(): Location;
}

export default IPlagiarismMatch
import IPerson from '../IPerson'

/**
 * A concrete class that represents a Project in the Plagiarism Detector.
 * 
 * A 'Project' is a container for the data related to a directory or 
 * file submitted for analysis.
 */

class Project {
    constructor(protected dateSubmitted: Date,
                protected documents: string[]
                ){}

    getDateSubmitted() : Date {
        return this.dateSubmitted
    }

    getDocuments() : string[] {
        return this.documents;
    }
}

export default Project

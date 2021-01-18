import IPerson from './IPerson'

/**
 * A concrete class that represents a Project in the Plagiarism Detector.
 * 
 * A 'Project' is a container for the data related to a directory or 
 * file submitted for analysis.
 */

class Project {
    constructor(protected dateSubmitted: Date,
                protected documents: string[],
                // protected authors: IPerson[]
                ){}
    //TODO: I removed the authors field for quicker testing. Will put back - Brian.

    getDateSubmitted() : Date {
        return this.dateSubmitted
    }

    getDocuments() : string[] {
        return this.documents;
    }

    // getAuthors() : IPerson[] {
    //     return this.authors;
    // }

}

export default Project

/**
 * Concrete class that represents a Location in a document.
 * 
 * A 'Location' has start and end line numbers and optional col number that 
 * represent a position in a document. File ID represents the file number in a given project that
 * contains many files 
 */

class Location {
   
    constructor( protected fileId: number, protected startLine : number, protected endLine : number, protected col? : number) {}

    public getStartLine() : number {
        return this.startLine
    }

    public getEndLine() : number {
        return this.endLine
    }

    public getCol() : number  {
        return this.col
    }

    public getFileId() : number {
        return this. fileId;
    }

}

export default Location

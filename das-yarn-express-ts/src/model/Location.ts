/**
 * Concrete class that represents a Location in a document.
 * 
 * A 'Location' has a line number and col number that 
 * represent a position in a document
 */

class Location {
   
    constructor(protected line : number, protected col : number) {}

    public getLine() : number {
        return this.line
    }

    public getCol() : number  {
        return this.col
    }
}

export default Location
import IPlagiarismMatch from "./IPlagiarismMatch";
import Location from "./Location";

/**
 * A comment match represents two locations in two files that are considered flagged for 
 * plagiarism. Severity refers to the level of severity of the suspected plagiarism
 */
class CommentStringSimMatch implements IPlagiarismMatch {

    constructor(public locationP1: Location, public locationP2: Location, public severity: number, public type: string = "comment"){}

    getType(): string {
        return this.type;
    }

    getLocationP1(): Location {
        return undefined;
    }

    getLocationP2(): Location {
        return undefined;
    }

    getSeverity(): number {
        return 0;
    }

    toString(): string {
        return "comment string Match of value = " + this.severity;
    }
}

export default CommentStringSimMatch;
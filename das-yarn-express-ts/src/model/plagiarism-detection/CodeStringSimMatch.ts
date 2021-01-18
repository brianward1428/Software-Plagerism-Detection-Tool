import IPlagiarismMatch from "./IPlagiarismMatch";
import Location from "./Location";

/**
 * A code match represents two locations in two files that are considered flagged for 
 * plagiarism. Severity refers to the level of severity of the suspected plagiarism
 */
class CodeStringSimMatch implements IPlagiarismMatch {

    constructor(public locationP1: Location, public locationP2: Location, public severity: number, public type: string = "code"){}

    getType(): string {
        return this.type;
    }

    getLocationP1(): Location {
        return this.locationP1;
    }

    getLocationP2(): Location {
        return this.locationP2;
    }

    getSeverity(): number {
        return 0;
    }

    toString(): string {
        return "Code string Match of value = " + this.severity;
    }
}

export default CodeStringSimMatch;
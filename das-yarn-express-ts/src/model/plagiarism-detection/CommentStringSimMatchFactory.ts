import IMatchFactory from "./IMatchFactory";
import IPlagiarismMatch from "./IPlagiarismMatch";
import CommentStringSimMatch from "./CommentStringSimMatch";
import Location from "./Location";

/**
 * Match factory for comment matches
 */
export default class CommentStringSimMatchFactory implements IMatchFactory {

    constructor() { }

    createMatch(locationP1: Location, locationP2: Location, severity: number): IPlagiarismMatch {
        return new CommentStringSimMatch(locationP1, locationP2, severity);
    }

}

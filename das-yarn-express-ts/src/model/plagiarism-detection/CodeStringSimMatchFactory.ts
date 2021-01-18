import IMatchFactory from "./IMatchFactory";
import IPlagiarismMatch from "./IPlagiarismMatch";
import Location from "./Location";
import CodeStringSimMatch from "./CodeStringSimMatch";

/**
 * Match factory for code matches
 */
export default class CodeStringSimMatchFactory implements IMatchFactory {

    constructor() { }

    createMatch(locationP1: Location, locationP2: Location, severity: number): IPlagiarismMatch {

        return new CodeStringSimMatch(locationP1, locationP2, severity);

    }

}

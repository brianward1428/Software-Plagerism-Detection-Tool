import IPlagiarismMatch from './IPlagiarismMatch'
import Location from "./Location";
/**
 * Interface that represents a Match Factory in the Plagiarism Detector.
 * 
 * A 'Match Factory' is an object that creates instances of a Plagiarism Match
 */

interface IMatchFactory {

    createMatch(locationP1: Location, locationP2: Location, severity: number): IPlagiarismMatch;
}

export default IMatchFactory

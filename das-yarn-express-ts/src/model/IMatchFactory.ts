import IPlagiarismMatch from './IPlagiarismMatch'
/**
 * Interface that represents a Match Factory in the Plagiarism Detector.
 * 
 * A 'Match Factory' is an object that creates instances of a Plagiarism Match
 */

interface IMatchFactory {

    createMatch(): IPlagiarismMatch,
}

export default IMatchFactory
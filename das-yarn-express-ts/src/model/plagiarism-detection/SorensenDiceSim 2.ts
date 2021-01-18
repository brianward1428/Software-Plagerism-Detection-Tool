/**
 * Compares two strings based on the Sorensen-Dice Index.
 */
import IStringSimilarity from "./IStringSimilarity";

/**
 * String similarity algorithm
 */
class SorensenDiceSim implements IStringSimilarity {

    compare(stringA: string, stringB: string) : number {

        if (stringA === '' || stringB === '') {
            return 0.0;
        }
        // Were going to start by just tokenizing the string (splitting on ' ' )
        let tokensA = new Set<string>(stringA.toLowerCase().trim().split(' ').map(s => s.trim()).filter((token) => token !== ''));
        let tokensB = new Set<string>(stringB.toLowerCase().trim().split(' ').map(s => s.trim()).filter((token) => token !== ''));

        

        // For the coeeficcient we need to find the intersection of the two sets.

        let intersect = new Set(Array.from(tokensA).filter(i => tokensB.has(i)));

        return ((2 * intersect.size) / (tokensA.size + tokensB.size))
    }
}

export default SorensenDiceSim;

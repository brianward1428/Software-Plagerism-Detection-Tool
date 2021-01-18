/**
 * Compares two strings based on the Sorensen-Dice Index.
 */
import IStringSimilarity from "./IStringSimilarity";

class SorensenDiceSim implements IStringSimilarity {

    compare(stringA: string, stringB: string) : number {

        if (stringA === '' || stringB === '' || stringA === ' ' || stringB === ' ') {
            return 0.0;
        }
        // Were going to start by just tokenizing the string (splitting on ' ' )
        let tokensA = new Set<string>(stringA.toLowerCase().split(' ').map(s => s.trim()));
        let tokensB = new Set<string>(stringB.toLowerCase().split(' ').map(s => s.trim()));


        // For the coeeficcient we need to find the intersection of the two sets.

        let intersect = new Set(Array.from(tokensA).filter(i => tokensB.has(i)));

        // Now we just have a simple calculation:
        // console.log("size A", tokensA.size);
        // console.log("tokens A :", tokensA);
        //
        // console.log("size B", tokensB.size);
        // console.log("tokens B :", tokensB);
        //
        // console.log("intersect", intersect.size);
        // console.log("intersect : ", intersect);

        return ((2 * intersect.size) / (tokensA.size + tokensB.size))
    }


}


export default SorensenDiceSim;

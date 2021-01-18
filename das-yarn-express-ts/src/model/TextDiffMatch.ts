import IPlagerismMatch from "./IPlagiarismMatch";

/**
 * Concrete class for a Text Diff Match for the Plagiarism Detector
 */

class TextDiffMatch implements IPlagerismMatch {

    constructor(
        public locationP1: Location,
        public locationP2: Location,
        public severity: number,
    ){}

    toString(): string {
        throw new Error("Method not implemented.");
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
}

export default TextDiffMatch
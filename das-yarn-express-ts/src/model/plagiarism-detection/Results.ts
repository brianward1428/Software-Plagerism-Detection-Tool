import IPlagiarismMatch from "./IPlagiarismMatch";

/**
 * Results object for a submission. Contains the matches and similarity values for a submission
 */
export default class Results {

    constructor(private _matches: IPlagiarismMatch[],
                private _literalSimValue: number,
                private _identifierSimValue: number) {
    }

    public getMatches(): IPlagiarismMatch[] {
        return this._matches;
    }

    public getLiteralSimValue(): number {
        return this._literalSimValue;
    }

    public getTdentifierSimValue(): number {
        return this._identifierSimValue;
    }

    public toString(): string {

        return "LiteralSimValue = " + this._literalSimValue.toString() + "\n"
                + "IdentifierSimValue = " + this._identifierSimValue.toString() + "\n"
                + "matches = " + this._matches.toString();
    }
}

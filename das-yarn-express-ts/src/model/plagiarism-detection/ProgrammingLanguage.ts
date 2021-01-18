import ProgrammingLanguageEnum from "./ProgrammingLanguageEnum";

class ProgrammingLanguage {
    constructor(private name : ProgrammingLanguageEnum, private commentIdentifier : string,
        private keyWords: string[]) {
            this.name = name;
            this.commentIdentifier = commentIdentifier;
            this.keyWords = keyWords;
        }

    getName() : ProgrammingLanguageEnum {
        return this.name;
    }

    getCommentIdentifier() : string {
        return this.commentIdentifier;
    }

    getKeyWords() : string[] {
        return this.keyWords;
    }

}

export default ProgrammingLanguage;

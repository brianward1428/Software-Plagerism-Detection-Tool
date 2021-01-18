import React from 'react'
import { connect } from "react-redux";
import { IDENTIFIER, LITERAL, Container, Box, Title, BoxContainer, Subtitle, Description, SectionContainer, Matches, MatchesContainer, LineText, NumberText, ProgramBox, ProgramContainer, MatchBox, BackButton, AcceptButton, RejectButton } from './constants';


class results extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    render(): any {

        /**
         * Get the Program View of a Particular Project.
         * @param project.
         */
        const getProgramView = (project: string): any => {


            let myFile: string[] = ['No file found'];
            let result: string = '';
            let myFileIndex = 0;
            let myFileName = '';
            let myFileNamesList = [];

            switch (project) {
                case 'P1':

                    myFile = this.props.fileListP1[this.props.currentFileIndexP1];
                    result = 'Program1';
                    myFileIndex = this.props.currentFileIndexP1;
                    myFileName = this.props.fileListNamesP1[this.props.currentFileIndexP1];
                    myFileNamesList = this.props.fileListNamesP1;
                    break;
                case 'P2':

                    myFile = this.props.fileListP2[this.props.currentFileIndexP2];
                    result = 'Program2';
                    myFileIndex = this.props.currentFileIndexP2;
                    myFileName = this.props.fileListNamesP2[this.props.currentFileIndexP2];
                    myFileNamesList = this.props.fileListNamesP2;
                    break;

                default:
                // myFile will just be empty.
            }

            if (! myFile){
                return (<ProgramBox empty><LineText> Error parsing file. Please Re-submit. </LineText></ProgramBox>)
            }

            // Okay so we basically want to check every line to see if its in a match or not..
            let fileWithMatches = myFile.map((line: string) => { return { isMatch: false, line: line } });

            // now lets just loop through each of our matches and make isMatch true if found.
            this.props.matches.forEach((match: any) => {
                if (project === "P1") {
                    if (match.locationP1.fileId === myFileIndex) {
                        let currentLine = match.locationP1.startLine;
                        while (currentLine <= match.locationP1.endLine) {
                            fileWithMatches[currentLine].isMatch = true;
                            currentLine++;
                        }
                    }
                } else {
                    // so no were just dealing with P2
                    if (match.locationP2.fileId === myFileIndex) {
                        let currentLine = match.locationP2.startLine;
                        while (currentLine <= match.locationP2.endLine) {
                            fileWithMatches[currentLine].isMatch = true;
                            currentLine++;
                        }
                    }
                }
            });


            const onFileChange = (e: any) => {
                this.props.dispatch({ type: 'CHANGE_CURRENT_FILE', project: project, index: parseInt(e.target.value) });
            };



            let FileSelector = (
                <select className="form-select" aria-label="Default select example" onChange={onFileChange}>
                    {myFileNamesList.map((fileName: string, key: number) => (<option value={key}>{fileName}</option>))}
                </select>
            )

            if (myFile.length < 1) {
                return (<ProgramBox empty><LineText>No files were found!</LineText></ProgramBox>)
            }
            return (
                <ProgramContainer>
                    <div className="row">
                        <div className="col-md-8">
                            <Subtitle>{result}/{myFileName}</Subtitle>
                        </div>
                        <div className="col-md-4">
                            {FileSelector}
                        </div>
                    </div>
                    <ProgramBox>
                        {fileWithMatches.map((line: any, key: number) => {
                            if (line.isMatch) {
                                return (<LineText severity><NumberText > {key + 1}:</NumberText>  {line.line} </LineText>)
                            } else {
                                return (<LineText><NumberText>  {key + 1}:</NumberText>  {line.line}</LineText>)
                            }
                        })}
                    </ProgramBox>
                </ProgramContainer>

            )
        };

        /**
         * Render the match view of specific lines for the match. (3 lines previous, 3 lines post).
         * @param project : either 'P1' or 'P2', for rendering the preview for the respective project.
         */

        const getMatchView = (project: string) => {

            if (this.props.matches.length < 1 || this.props.fileListP1.length < 1 || this.props.fileListP2.length < 1) {
                return (<ProgramBox empty><LineText>No matches were found!</LineText></ProgramBox>)
            }

            let myMatch = this.props.matches[this.props.currentMatchIndex];


            let myFile: [] = [];
            let startLine: number = 0;
            let endLine: number = 0;
            let myFileName: string = "";
            let result: string = '';

            switch (project) {

                case 'P1':
                    myFile = this.props.fileListP1[myMatch.locationP1.fileId];
                    startLine = myMatch.locationP1.startLine;
                    endLine = myMatch.locationP1.endLine;
                    result = 'Program1';
                    try {
                        myFileName = this.props.fileListNamesP1[myMatch.locationP1.fileId];
                    } catch (e) {
                        myFileName = "error getting file Name";

                    }

                    break;

                case 'P2':
                    myFile = this.props.fileListP2[myMatch.locationP2.fileId];
                    startLine = myMatch.locationP2.startLine;
                    endLine = myMatch.locationP2.endLine;
                    result = 'Program2';
                    try {
                        myFileName = this.props.fileListNamesP2[myMatch.locationP2.fileId];
                    } catch (e) {
                        myFileName = "error getting file Name";
                    }

                    break;

                default:
            }


            let linesBefore = [];
            let linesAfter = [];

            //TODO : NEED TO DO SOME ERROR CHECKS HERE.

            /**
             * Get the Three lines before match line.
             */
            try {
                if (startLine - 3 < 0) {
                    linesBefore = myFile.slice(0, startLine);
                } else {
                    linesBefore = myFile.slice(startLine - 3, startLine);
                }
            } catch (e) {
                return (<ProgramBox empty><LineText>Error reading file</LineText></ProgramBox>)
            }

            /**
             * Get the Three lines after match line.
             */

            try {
                if (endLine + 3 > myFile.length - 1) {
                    linesAfter = myFile.slice(endLine + 1, myFile.length + 1);
                } else {
                    linesAfter = myFile.slice(endLine + 1, endLine + 4);
                }
            } catch (e) {
                return (<ProgramBox empty><LineText>Error reading file</LineText></ProgramBox>)
            }


            /**
             * Now lets get our number lines back.
             */
            let linesBeforeMapped = [];
            let counter = 1;
            // how can I hold onto the line numbers?
            for (let line of linesBefore.reverse()) {
                linesBeforeMapped.push({ index: startLine - counter, line: line });
                counter++;
            }

            // now we just need to reverse it back
            linesBeforeMapped = linesBeforeMapped.reverse();

            let linesAfterMapped = [];
            counter = 1;
            // how can I hold onto the line numbers?
            for (let line of linesAfter) {
                linesAfterMapped.push({ index: endLine + counter, line: line });
                counter++;
            }

            // Now we need to get the lines of the match.
            let matchedLines = myFile.slice(startLine, endLine + 1);
            let matchedLinesMapped: any[] = [];
            for (let i in matchedLines) {
                matchedLinesMapped.push({ index: parseInt(i) + startLine, line: matchedLines[i] });
            }


            return (
                <ProgramContainer>
                    <Subtitle>{result}/{myFileName}</Subtitle>
                    <MatchBox>
                        {linesBeforeMapped.map((line) => (<LineText><NumberText>{line.index + 1}:</NumberText>   {line.line}</LineText>))}
                        {matchedLinesMapped.map(line => (<LineText severity> <NumberText >{line.index + 1}:</NumberText>    {line.line}</LineText>))}
                        {linesAfterMapped.map((line) => (<LineText><NumberText>{line.index + 1}:</NumberText>     {line.line}</LineText>))}
                    </MatchBox>
                </ProgramContainer>
            )
        };


        /**
         * Accepting a match will simply increase the current match index my one.
         */
        const keepMatch = () => {
            // increase current Index.
            if (this.props.currentMatchIndex >= this.props.matches.length) {
                // were already at the end
                // do nothing.
            } else {
                this.props.dispatch({ type: 'INCREASE_MATCH_INDEX' });
            }
        };


        /**
         * Accepting a match will simply increase the current match index my one.
         */
        const previousMatch = () => {
            // decrease current Index.
            if (this.props.currentMatchIndex <= 0) {
                // do nothing, were already at the beginning.
            } else {
                this.props.dispatch({ type: 'DECREASE_MATCH_INDEX' })
            }
        };

        /**
         * Accepting a match will simply increase the current match index my one.
         */
        const discardMatch = () => {
            // If were at the last match, then we need to reduce our index.
            if (this.props.currentMatchIndex === this.props.matches.length - 1) {
                previousMatch();
            }
            // if there are no matches left do nothing.
            if (this.props.matches.length !== 0) {
                this.props.dispatch({ type: 'REMOVE_MATCH', index: this.props.currentMatchIndex })
            }
        };

        /**
         * Get the number of a specific type of matches.
         * @param type
         */
        const getCountOfMatches = (type: string) => {
            // just going to filter matches and get length.
            return this.props.matches.filter((match: { type: string; }) => match.type == type).length;
        };

        return (
            <>
                <Container>
                    <Title>{this.props.submissionName} Results</Title>
                    <Title>Broken Down</Title>
                    <SectionContainer>
                        <BoxContainer>
                            <Box severity={this.props.literalSimValue.toPrecision(3)}>{this.props.literalSimValue.toPrecision(3) * 100}%</Box>
                            <Subtitle>Literal Sim Value</Subtitle>
                            <Description>{LITERAL}</Description>
                        </BoxContainer>
                        <BoxContainer>
                            <Box severity={this.props.identifierSimValue.toPrecision(3)}>{this.props.identifierSimValue.toPrecision(3) * 100}%</Box>
                            <Subtitle>Identifier Sim Value</Subtitle>
                            <Description>{IDENTIFIER}</Description>
                        </BoxContainer>
                        <MatchesContainer>
                            <BoxContainer>
                                <Subtitle code>Code Matches</Subtitle>
                                <Description>Number of matches in lines of code:</Description>
                                <Matches>{getCountOfMatches('code')}</Matches>
                            </BoxContainer>
                            <BoxContainer>
                                <Subtitle>Comment Matches</Subtitle>
                                <Description>Number of matches in lines of comments:</Description>
                                <Matches>{getCountOfMatches('comment')}</Matches>
                            </BoxContainer>
                        </MatchesContainer>
                    </SectionContainer>
                    <Title>Program View</Title>
                    <SectionContainer>
                        {getProgramView('P1')}
                        {getProgramView('P2')}
                    </SectionContainer>
                    <Title>Match View</Title>
                    <SectionContainer>
                        {getMatchView('P1')}
                        {getMatchView('P2')}
                    </SectionContainer>
                    <Subtitle>Viewing Match: {this.props.matches.length > 0 ? this.props.currentMatchIndex + 1 : 0}/{this.props.matches.length}</Subtitle>
                    <SectionContainer>
                        <BackButton onClick={() => previousMatch()} title={"Go to previous Match"}>Back</BackButton>
                        <AcceptButton onClick={() => keepMatch()} title={"Accept this current Match"}>Keep</AcceptButton>
                        <RejectButton onClick={() => discardMatch()} title={"Reject this current Match"}>Discard</RejectButton>
                    </SectionContainer>
                </Container>
            </>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        submissionName: state.submission.submissionName,
        submissionLanguage: state.submission.submissionLanguage,
        fileListP1: state.submission.fileListP1,
        fileListP2: state.submission.fileListP2,
        fileListNamesP1: state.submission.fileListNamesP1,
        fileListNamesP2: state.submission.fileListNamesP2,
        currentFileIndexP1: state.submission.currentFileIndexP1,
        currentFileIndexP2: state.submission.currentFileIndexP2,
        matches: state.submission.matches,
        literalSimValue: state.submission.literalSimValue,
        identifierSimValue: state.submission.identifierSimValue,
        currentMatchIndex: state.submission.currentMatchIndex,
    }
};
const resultsComponent = connect(mapStateToProps)(results);

export default resultsComponent;

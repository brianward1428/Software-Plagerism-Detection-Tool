import SubmissionService from "../services/SubmissionService";



let subService = new SubmissionService();

const readLines = (doc: string) => {
    return doc.split(/\r?\n/);

}

const submit = (name: string, fileListP1: string[], fileListP2: string[], fileListNamesP1 : string[], fileListNamesP2 : string[], language: string, ignoreFile : string, simThreshold : string, dispatch: any) => {
    let submissionLocal = {
        name: name,
        language: language,
        fileListP1: fileListP1.map(doc => readLines(doc)),
        fileListP2: fileListP2.map(doc => readLines(doc)),
        fileListNamesP1: fileListNamesP1,
        fileListNamesP2: fileListNamesP2
    };

    let submission = {
        name: name,
        language: language,
        fileListP1: fileListP1,
        fileListP2: fileListP2,
        ignoreFile: ignoreFile,
        simThreshold: simThreshold
    };

    console.log("our submission looks like : ", submission);

    dispatch({ type: 'CREATE_SUBMISSION', submission: submissionLocal });

    subService.createSubmission(submission).then(res => {
        console.log("our res looks like : ", res);
        if (res.data) {
            console.log("results : ", res.data);
            dispatch({ type: 'ADD_RESULTS', res: res.data });
        } else {
            console.log("ERRORRRRRRR : ");
            throw new Error(" Error Submitting projects.");

        }
    });
};

export default submit;

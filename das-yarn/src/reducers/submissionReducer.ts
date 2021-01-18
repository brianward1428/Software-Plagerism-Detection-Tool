
let initialState = {
    submissionName: "",
    submissionLanguage: "Javascript",
    fileListP1: [],
    fileListP2: [],
    fileListNamesP1: [],
    fileListNamesP2: [],
    currentFileIndexP1: 0,
    currentFileIndexP2: 0,
    matches: [],
    literalSimValue: 0.0,
    identifierSimValue: 0.0,
    currentMatchIndex: 0,
};

const submissionReducer = (state = initialState, action: any) => {

    switch (action.type) {
        case 'CREATE_SUBMISSION':

            return {
                ...state,
                submissionName: action.submission.name,
                submissionLanguage: action.submission.language,
                fileListP1: action.submission.fileListP1,
                fileListP2: action.submission.fileListP2,
                fileListNamesP1: action.submission.fileListNamesP1,
                fileListNamesP2: action.submission.fileListNamesP2,
            };

        case 'ADD_RESULTS':

            let newState = {
                ...state,
                matches: action.res._matches,
                 literalSimValue: action.res._literalSimValue,
                 identifierSimValue: action.res._identifierSimValue,
            };

            return newState;

        case 'CHANGE_CURRENT_FILE':

            if (action.project === 'P1'){
                return  {
                    ...state,
                    currentFileIndexP1: action.index,
                };
            } else {
                return  {
                    ...state,
                    currentFileIndexP2: action.index,
                };
            }



        case 'REMOVE_MATCH':

            return  {
                ...state,
                matches: [...state.matches.slice(0, action.index),
                    ...state.matches.slice(action.index + 1)],
            };

        case 'INCREASE_MATCH_INDEX':
            return  {
                ...state,
                currentMatchIndex: state.currentMatchIndex + 1,
            };

        case 'DECREASE_MATCH_INDEX':
            return  {
                ...state,
                currentMatchIndex: state.currentMatchIndex - 1,
            };


        default:
            return state;
    }};



export default submissionReducer;

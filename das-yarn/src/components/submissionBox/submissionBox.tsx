import React, { FunctionComponent } from 'react'
import { SubBoxContainer, StyledButton2, StyledUploadIcon, StyledIncompleteIcon, SubmissionBoxProps, Text } from './constants'
import { message, Upload } from 'antd'
import { connect } from "react-redux";
import addFiles from "../../actions/submissionActions";

const SubmissionBoxComponent: FunctionComponent<SubmissionBoxProps> = ({
    title,
    buttonLabel,
    uploaded,
    onClick
}) => {
    let fileList: (string | ArrayBuffer | null)[] = [];


    return (
        <SubBoxContainer>
            {uploaded ?
                <StyledUploadIcon />
                :
                <StyledIncompleteIcon />
            }
            <Text>{title}</Text>
            <Upload directory
                accept=".js"
                beforeUpload={file => {
                    const reader = new FileReader();

                    reader.onload = e => {
                        // @ts-ignore
                        console.log(e.target.result);
                        // @ts-ignore
                        fileList.push(e.target.result);
                        console.log("file list ...", fileList);
                    };
                    reader.readAsText(file);

                    // Prevent upload
                    return false;
                }}>
                <StyledButton2 onClick={onClick}>{buttonLabel}</StyledButton2>
            </Upload>
        </SubBoxContainer>
    )
}

const mapStateToProps = (state: any) => {
    return {
        state
    }
};

// const dispatchToPropertyMapper = (dispatch: any) => {
//     return {
//         setFileList: (fileList: any) => addFiles(fileList, dispatch),
//     }
// };

const SubmissionBox = connect(mapStateToProps)(SubmissionBoxComponent);

export default SubmissionBox

import { Container, StyledForm, StyledButton, StyledButton2, SubmissionContainer, SubBoxContainer, SubBoxText, Text, DescriptionText, IgnoreFile, LabelText } from './constants'
import React, { useState } from 'react'

import { Link } from 'react-router-dom';

import { connect } from "react-redux";
import submit from '../../actions/submissionActions';
import { Input, Select, Upload } from 'antd';

// @ts-ignore
const NewSubmission = ({ dispatch }) => {
    const { Option } = Select;
    const [form] = StyledForm.useForm();

    let language = 'javaScript';

    const onFinish = (values: any) => {
        language = values;
    };

    let subName: string = 'submission';

    const onChange = (e: any) => {
        subName = e.target.value;
    };

    let simThreshold = "0.9";
    const onThresholdChange = (values: any) => {
        simThreshold = values;
    };

    let ignoreFile = "";
    const onIgnoreFileChange = (e: any) => {
        try {
            let files = e.target.files;
            let f = files[0];
            const reader = new FileReader();
            reader.onload = handleIgnoreFileLoad;
            reader.readAsText(f);
        } catch (e) {
            console.log("error reading ignore file :", e);
        }
    };

    const handleIgnoreFileLoad = (e: any) => {
        ignoreFile = e.target.result;
    };


    const formLayout = {
        labelCol: { span: 12 },
    };

    const fileListP1: any[] = [];
    const fileListNamesP1: any[] = [];
    const fileListP2: any[] = [];
    const fileListNamesP2: any[] = [];

    const propsP1 = {
        directory: true,
        accept: '.js',
        beforeUpload: (file: any) => {
            fileListNamesP1.push(file.name);

            const readerP1 = new FileReader();
            readerP1.onload = e => {
                // @ts-ignore
                fileListP1.push(e.target.result);
            };
            readerP1.readAsText(file);
            return false;
        },
        onRemove: (file: any) => {
            // So we need to remove it from both the fileList and the fileNameList:
            let index = fileListNamesP1.indexOf(file.name);
            if (index !== -1){
                // remove from FileList
                fileListP1.splice(index, 1);
                // remove from fileListName
                fileListNamesP1.splice(index, 1);
            } else {
                alert("error removing file. please try again");
            }
        }

    };

    const propsP2 = {
        directory: true,
        accept: '.js',
        beforeUpload: (file: any) => {
            const readerP2 = new FileReader();
            fileListNamesP2.push(file.name);
            readerP2.onload = e => {

                // @ts-ignore
                fileListP2.push(e.target.result);
            };
            readerP2.readAsText(file);
            return false;
        },
        onRemove: (file: any) => {
            // So we need to remove it from both the fileList and the fileNameList:
            let index = fileListNamesP2.indexOf(file.name);
            if (index !== -1){
                // remove from FileList
                fileListP2.splice(index, 1);
                // remove from fileListName
                fileListNamesP2.splice(index, 1);
            } else {
                alert("error removing file. please try again");
            }
        }
    };

    return (
        <>
            <Container>
                <Text>{'New Submission'}</Text>
                <StyledForm {...formLayout} initialValues={{ layout: formLayout }} layout={'horizontal'} form={form} name={"control-hooks"} onFinish={onFinish}>
                    <StyledForm.Item name="submission name" label="Submission Name" rules={[{ required: true }]}>
                        <Input onChange={onChange} />
                    </StyledForm.Item>
                    <StyledForm.Item name="language" label="Language" rules={[{ required: true }]}>
                        <Select
                            placeholder="Select an option"
                            allowClear
                            onChange={onFinish}>
                            <Option value="java script">JavaScript</Option>
                            <Option value="other">other</Option>
                        </Select>
                    </StyledForm.Item>
                    <StyledForm.Item name="threshold" label="Similarity Threshold" rules={[{ required: false }]}>
                        <Select
                            // @ts-ignore
                            title={"The Threshold value at which to consider two lines or snippets of code to be a match. The default value is 0.9"}
                            id="threshold"
                            placeholder="Similarity Threshold"
                            allowClear
                            onChange={onThresholdChange}>
                            <Option value="0.50" >0.50</Option>
                            <Option value="0.55" >0.55</Option>
                            <Option value="0.60" >0.60</Option>
                            <Option value="0.65" >0.65</Option>
                            <Option value="0.70" >0.70</Option>
                            <Option value="0.75" >0.75</Option>
                            <Option value="0.80" >0.80</Option>
                            <Option value="0.85" >0.85</Option>
                            <Option value="0.90" >0.90</Option>
                            <Option value="0.95" >0.95</Option>
                        </Select>
                    </StyledForm.Item>
                    <IgnoreFile>
                        <LabelText>Ignore File:</LabelText>
                        <Input type="file" className="custom-file-input" id="customFile" onChange={onIgnoreFileChange}
                            // @ts-ignore
                               title={"You many upload a file of code which will be ignored by our detection engine. " +
                               "Each line of code in the uploaded file will be completely ignored. " +
                               "An example usecase would be uploading the starter code for the assignment, this will ensure no matches" +
                               "will be found from the start code of the assignment."}
                        />
                    </IgnoreFile>
                </StyledForm>
                <SubmissionContainer>
                    <SubBoxContainer>
                        <SubBoxText>{"Project 1"}</SubBoxText>
                        <DescriptionText>{"Please submit all files in a project in a single folder."}</DescriptionText>
                        <Upload {...propsP1} >
                            <StyledButton2>{"Upload"}</StyledButton2>
                        </Upload>
                    </SubBoxContainer>
                    <SubBoxContainer>
                        <SubBoxText>{"Project 2"}</SubBoxText>
                        <DescriptionText>{"Please submit all files in a project in a single folder."}</DescriptionText>
                        <Upload {...propsP2}>
                            <StyledButton2>{'Upload'}</StyledButton2>
                        </Upload>
                    </SubBoxContainer>
                </SubmissionContainer>
                <Link to={`/results`}>
                    <StyledButton onClick={() => {
                        submit(subName, fileListP1, fileListP2, fileListNamesP1, fileListNamesP2, language, ignoreFile, simThreshold, dispatch);
                    }}
                    >{'Run Analysis'}</StyledButton>
                </Link>
            </Container>
        </>
    )
};

const mapStateToProps = () => {
    return {}
};

const newSubmissionComponent = connect(mapStateToProps)(NewSubmission);

export default newSubmissionComponent;

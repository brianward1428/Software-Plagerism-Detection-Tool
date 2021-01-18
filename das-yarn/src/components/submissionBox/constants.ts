import styled from 'styled-components'
import { CheckCircleFilled, ExclamationCircleFilled } from '@ant-design/icons'
import { $black, $green, $red, $white } from '../../assests/colors'
import { Button } from 'antd';

export interface SubmissionBoxProps {
    title: string;
    buttonLabel: string;
    onClick(): void;
    uploaded?: boolean;
}

export const SubBoxContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 400px;
    height: 420px;
    border: 1px solid ${$black};
    padding: 20px;
    margin: 0px 50px;
`;

export const Text = styled.p`
    font: 18px/24px 'Open Sans';
    align-text: right;
    padding-top: 25px;
`;

export const StyledUploadIcon = styled(CheckCircleFilled)`
    font-size: 95px;
    color: ${$green};
`;

export const StyledIncompleteIcon = styled(ExclamationCircleFilled)`
    font-size: 95px;
    color: ${$red};
`;

export const StyledButton2 = styled(Button)`
    font: 18px/24px 'Open Sans';
    background-color: ${$black};
    color: ${$white};
    height: 40px;
    width: 100px;
    border-radius: 5px;

    &:hover {
        border: 1px solid ${$black};
        color: ${$black};
    }
`;
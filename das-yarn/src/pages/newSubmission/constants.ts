import styled from 'styled-components'
import { $white, $black, $red } from '../../assests/colors'
import { Button, Form } from 'antd'

export const Container = styled.div`
    display: flex;
    height: 100vh;
    background-color: ${$white};
    width: 100%;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    padding: 10px 0px;
`;

export const StyledButton = styled(Button)`
    font: 36px/48px 'Open Sans';
    color: ${$white};
    background-color: ${$black};
    height: 80px;
    width: 345px;
    margin: 25px;
    border-radius: 5px;

    &: hover {
        color: ${$black};
        border: 1px solid ${$black};
    };
`;

export const StyledForm = styled(Form)`
    font: 18px/24px 'Open Sans';
    margin-top: 10px;
`;

export const Text = styled.p`
    font: 700 24px/32px 'Open Sans';
    align-text: center;
    margin: 0;
`;

export const SubmissionContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`;

export const SubBoxContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 400px;
    height: 420px;
    border: 1px solid ${$black};
    margin: 0px 50px;
`;

export const SubBoxText = styled.p`
    font: 700 24px/32px 'Open Sans';
    text-align: center;
    padding: 25px;
`;

export const DescriptionText = styled.p`
    font: 18px/22px 'Open Sans';
    text-align: center;
    padding: 50px;
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
    };
`;

export const IgnoreFile = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px;
`;

export const StyledInput = styled.input`
`;

export const LabelText = styled.p`
    font: 14px 'Open Sans';
    width: 50%;;
`;
import styled from 'styled-components'
import { $white, $black, getColor, $grey, $red, $green } from '../../assests/colors'
import { Button } from 'antd';

export const Container = styled.div`
    display: flex;
    background-color: ${$white};
    width: 100%;
    flex-direction: column;
    overflow: visible;
    align-items: center;
`;

export const Title = styled.div`
    font: 700 48px/65px 'Open Sans';
    padding-top: 50px;
    text-align: center;
`;

export const SectionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
    padding: 50px;
`;

export const BoxContainer = styled.div`
    width: 300px;
`;

export const Box = styled.div`
    font: 600 96px/130px 'Open Sans';
    color: ${$white};
    background-color: ${(props: { severity: number }) => {
        return getColor(Math.ceil(props.severity * 10));
    }};
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 245px;
`;

export const Subtitle = styled.p`
    ${(props: { code?: boolean }) => {
        return props.code ? 'margin-top: 0;' : 'margin-top: 30px';
    }};
    font: 700 24px/32px 'Open Sans';
`;

export const Description = styled.p`
    margin-top: 15px;
    font: 400 12px/16px 'Open Sans';
`;

export const MatchesContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Matches = styled.p`
    font: 400 50px/54px 'Open Sans';
`;

export const ProgramContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ProgramBox = styled(ProgramContainer)`
    width: 500px;
    height: 500px;
    border: 1px solid ${$black};
    overflow: scroll;
    ${(props: { empty?: boolean }) => {
        return props.empty ? `justify-content: center; align-items: center;` : '';
    }};
`;

export const MatchBox = styled(ProgramBox)`
    height: 300px;
`;

export const LineText = styled.div`
    font: 12px/15px 'Source Code Pro';
    display: -webkit-box;
    width: 100%;
    white-space: pre;
    ${(props: { severity?: boolean }) => {
        return props.severity ? `background-color: ${$red}66; color: ${$black}` : '';
    }};
`;

export const NumberText = styled(LineText)`
    background-color: ${$grey};
    color: ${$white};
    width: 38px;
    justify-content: center;
    margin-right: 10px;
`;

export const BackButton = styled(Button)`
    font: 36px/48px 'Open Sans';
    color: ${$white};
    background-color: ${$black};
    height: 80px;
    width: 200px;
    margin-top: 15px;
    border-radius: 5px;

    &: hover {
        color: ${$black};
        border: 1px solid ${$black};
    }
`;

export const AcceptButton = styled(BackButton)`
    background-color: ${$green};
    &: hover {
        color: ${$green};
        border: 1px solid ${$green};
    }
`;

export const RejectButton = styled(BackButton)`
    background-color: ${$red};
    &: hover {
        color: ${$red};
        border: 1px solid ${$red};
    }
`;

export const IDENTIFIER = 'Identifier refers to name given to entities such as variables, functions, structures etc.';

export const LITERAL = 'Literal refers to to a hard-coded value, generally text and numbers.'; 
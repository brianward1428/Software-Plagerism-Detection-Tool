import styled from 'styled-components'
import { $black, $white } from '../../assests/colors'

export interface HeaderProps {
    name: string;
    position: string;
    style?: StyleSheet;
}

export const Container = styled.div`
    display: flex;
    background-color: ${$black};
    top: 0;
    width: 100vw;
    align-items: flex-end;
    justify-content: center;
    height: 100px;
    flex-direction: column;
`;

export const Text = styled.p`
    font: 18px/24px 'Open Sans';
    color: ${$white};
    align-text: right;
    padding-right: 35px;
    margin: 0;
`;
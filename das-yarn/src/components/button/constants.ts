import styled from 'styled-components'
import { $black, $grey, $white } from '../../assests/colors'

export interface ButtonProps {
    buttonLabel: string;
    onClick(): void;
    type: string;
    height?: number;
    width?: number;
}

export const TYPES = {
    SMALL: 'small',
    LARGE: 'large'
}

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${(props: { type: string | undefined, height: number | undefined, width: number | undefined }) => {
        switch (props.type) {
            case TYPES.LARGE:
                return '80px; width: 345px;'
            case TYPES.SMALL:
                return '40px; width: 145px;'
            default:
                return `${props.height}px; width: ${props.width}px;`
        }
    }}
    background-color: ${$black};
    border-radius: 5px;
    &:hover {
        background-color: ${$grey};
    }
`;

export const ButtonLabel = styled.div`
    font: ${(props: { type: string }) => {
        switch (props.type) {
            case TYPES.LARGE:
                return '700 36px/50px'
            case TYPES.SMALL:
                return '18px/24px'
            default:
                return '14px/22px'
        }
    }} 'Open Sans';
    color: ${$white};
    padding: 10px;
    line-height: 1em;
    height: 1em;
`;
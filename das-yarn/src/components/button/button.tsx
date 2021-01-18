import React, { FunctionComponent } from 'react'
import { ButtonContainer, ButtonLabel, ButtonProps } from './constants'

const Button: FunctionComponent<ButtonProps> = ({
    buttonLabel,
    onClick,
    type,
    height,
    width
}) => {
    return (
        <ButtonContainer height={height} width={width} type={type} onClick={() => onClick()}>
            <ButtonLabel type={type}>{buttonLabel}</ButtonLabel>
        </ButtonContainer>
    )
}

export default Button
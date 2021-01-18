import React, { FunctionComponent } from 'react'
import { Container, HeaderProps, Text } from './constants'

const Header: FunctionComponent<HeaderProps> = ({
    name,
    position
}) => {
    return (
        <Container>
            <Text>{name}</Text>
            <Text>{position}</Text>
        </Container>
    )
}

export default Header
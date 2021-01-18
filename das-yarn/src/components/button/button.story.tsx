import React from 'react';
import Button from './button';
import { ButtonProps } from './constants';
import { Meta, Story } from '@storybook/react'

export default {
    title: 'Components/Button',
    component: Button,
    argTypes: {
        buttonLabel: { control: 'text' },
        type: {
            control: {
                type: 'select',
                options: [
                    'small',
                    'large'
                ],
            },
        },
        width: { control: 'number' },
        height: { control: 'number' },
        onClick: { action: 'clicked' },
    },
} as Meta;

const Template: Story<ButtonProps> = args => <Button {...args} />;

const CUSTOM_ARGS = {
    buttonLabel: 'Custom Button',
    height: 25,
    width: 150,
}

const LARGE_ARGS = {
    buttonLabel: 'Large Button',
    type: 'large',
}

const SMALL_ARGS = {
    buttonLabel: 'Small Button',
    type: 'small',
}

export const Custom = Template.bind({});
Custom.args = {
    ...CUSTOM_ARGS
};

export const Large = Template.bind({});
Large.args = {
    ...LARGE_ARGS
};

export const Small = Template.bind({});
Small.args = {
    ...SMALL_ARGS
};

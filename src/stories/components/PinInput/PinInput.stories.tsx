import React, { useState } from "react";
import { Meta, Story } from "@storybook/react";
import { PinInputProps } from "@components/pin-input/PinInput";
import { PinInput } from "@components/pin-input";

const meta: Meta = {
    title: "Components/PinInput",
    component: PinInput,
    argTypes: {
        length: {
            defaultValue: 4,
        },
        limitPerBox: {
            defaultValue: 1,
        },
    },
    args: {
        isNumeric: true,
    },
};

export default meta;

const Template: Story<PinInputProps> = (args): JSX.Element => {
    const [pin, setPin] = useState("");
    return (
        <div className="flex flex-col items-center">
            <h2>Pin: {pin}</h2>
            <PinInput {...args} setPin={setPin} />
        </div>
    );
};

export const Default = Template.bind({});

export const FullCode = (): JSX.Element => {
    const [pin, setPin] = useState("");
    return (
        <div className="flex flex-col items-center">
            <h2>Pin: {pin}</h2>
            <PinInput
                length={4}
                limitPerBox={1}
                setPin={(value) => {
                    setPin(value);
                }}
            />
        </div>
    );
};

export const NumericInput = Template.bind({});

NumericInput.args = {
    placeholder: "0",
    isNumeric: true,
};

export const DifferentPlaceholder = Template.bind({});

DifferentPlaceholder.args = {
    placeholder: "😇",
};

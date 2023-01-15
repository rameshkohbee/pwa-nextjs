import { RadioIcon } from "@library/icons";
import { Meta, Story } from "@storybook/react";

const meta: Meta = {
    title: "Icons/Radio",
    component: RadioIcon,
    argTypes: {
        type: {
            defaultValue: "checked",
        },
        color: {
            defaultValue: "black",
        },
    },
};

export default meta;

const Template: Story<typeof RadioIcon> = (args): JSX.Element => (
    <RadioIcon {...args} />
);

export const Default = Template.bind({});

export const Icontypes = (): JSX.Element => (
    <div className="flex justify-evenly">
        <RadioIcon type="unchecked" />
        <RadioIcon type="checked" />
    </div>
);
export const IconColors = (): JSX.Element => (
    <div className="flex justify-evenly">
        <RadioIcon color="red" type="unchecked" />
        <RadioIcon color="red" type="checked" />
        <RadioIcon color="blue" type="unchecked" />
        <RadioIcon color="blue" type="checked" />
    </div>
);

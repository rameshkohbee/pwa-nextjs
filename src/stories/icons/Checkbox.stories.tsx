import { CheckboxIcon } from "@library/icons";
import { Meta, Story } from "@storybook/react";

const meta: Meta = {
    title: "Icons/Checkbox",
    component: CheckboxIcon,
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

const Template: Story<typeof CheckboxIcon> = (args): JSX.Element => (
    <CheckboxIcon {...args} />
);

export const Default = Template.bind({});

export const Icontypes = (): JSX.Element => (
    <div className="flex justify-evenly">
        <CheckboxIcon type="unchecked" />
        <CheckboxIcon type="checked" />
    </div>
);
export const IconColors = (): JSX.Element => (
    <div className="flex justify-evenly">
        <CheckboxIcon color="red" type="unchecked" />
        <CheckboxIcon color="red" type="checked" />
        <CheckboxIcon color="blue" type="unchecked" />
        <CheckboxIcon color="blue" type="checked" />
    </div>
);

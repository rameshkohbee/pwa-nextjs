import { CheckCircleIcon, iconProps } from "@library/icons";
import { Meta, Story } from "@storybook/react";

const meta: Meta = {
    title: "Icons/CheckCircle",
    component: CheckCircleIcon,
    argTypes: {
        variant: {
            defaultValue: "outline",
        },
        color: {
            defaultValue: "black",
        },
    },
};

export default meta;

const Template: Story<iconProps> = (args) => <CheckCircleIcon {...args} />;

export const Default = Template.bind({});

export const IconVariants = (): JSX.Element => (
    <div className="flex justify-evenly">
        <CheckCircleIcon variant="solid" />
        <CheckCircleIcon variant="outline" />
    </div>
);
export const IconColors = (): JSX.Element => (
    <div className="flex justify-evenly">
        <CheckCircleIcon color="blue" variant="solid" />
        <CheckCircleIcon color="blue" variant="outline" />
        <CheckCircleIcon color="red" variant="solid" />
        <CheckCircleIcon color="red" variant="outline" />
    </div>
);

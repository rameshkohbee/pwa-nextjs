import { InfoIcon, iconProps } from "@library/icons";
import { Meta, Story } from "@storybook/react";

const meta: Meta = {
    title: "Icons/Info",
    component: InfoIcon,
};

export default meta;

const Template: Story<iconProps> = (args) => <InfoIcon {...args} />;

export const Default = Template.bind({});

export const IconVariants = (): JSX.Element => (
    <div className="flex justify-evenly">
        <InfoIcon variant="solid" />
        <InfoIcon variant="outline" />
    </div>
);
export const IconColors = (): JSX.Element => (
    <div className="flex justify-evenly">
        <InfoIcon color="blue" variant="solid" />
        <InfoIcon color="blue" variant="outline" />
        <InfoIcon color="red" variant="solid" />
        <InfoIcon color="red" variant="outline" />
    </div>
);

import { HourglassIcon } from "@library/icons";
import { Meta, Story } from "@storybook/react";

const meta: Meta = {
    title: "Icons/Hourglass",
    component: HourglassIcon,
};

export default meta;

const Template: Story<typeof HourglassIcon> = (args): JSX.Element => (
    <HourglassIcon {...args} />
);

export const Default = Template.bind({});

export const IconColors = (): JSX.Element => (
    <div className="flex justify-evenly">
        <HourglassIcon color="blue" />
        <HourglassIcon color="red" />
    </div>
);

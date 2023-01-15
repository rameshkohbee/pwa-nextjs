import { ClockIcon } from "@library/icons";
import { Meta, Story } from "@storybook/react";

const meta: Meta = {
    title: "Icons/Clock",
    component: ClockIcon,
};

export default meta;

const Template: Story<typeof ClockIcon> = (args): JSX.Element => (
    <ClockIcon {...args} />
);

export const Default = Template.bind({});

export const IconColors = (): JSX.Element => (
    <div className="flex justify-evenly">
        <ClockIcon color="blue" />
        <ClockIcon color="red" />
    </div>
);

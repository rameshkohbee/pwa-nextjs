import { CalenderIcon } from "@library/icons";
import { Meta, Story } from "@storybook/react";

const meta: Meta = {
    title: "Icons/Calender",
    component: CalenderIcon,
};

export default meta;

const Template: Story<typeof CalenderIcon> = (args): JSX.Element => (
    <CalenderIcon {...args} />
);

export const Default = Template.bind({});

export const IconColors = (): JSX.Element => (
    <div className="flex justify-evenly">
        <CalenderIcon color="blue" />
        <CalenderIcon color="red" />
    </div>
);

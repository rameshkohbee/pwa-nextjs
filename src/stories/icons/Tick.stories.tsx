import { TickIcon } from "@library/icons";
import { Meta, Story } from "@storybook/react";

const meta: Meta = {
    title: "Icons/Tick",
    component: TickIcon,
};

export default meta;

const Template: Story<typeof TickIcon> = (args): JSX.Element => (
    <TickIcon {...args} />
);

export const Default = Template.bind({});

export const IconColors = (): JSX.Element => (
    <div className="flex justify-evenly">
        <TickIcon color="blue" />
        <TickIcon color="red" />
    </div>
);

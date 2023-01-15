import { WarningIcon } from "@library/icons";
import { Meta, Story } from "@storybook/react";

const meta: Meta = {
    title: "Icons/Wraning",
    component: WarningIcon,
};

export default meta;

const Template: Story<typeof WarningIcon> = (args) => <WarningIcon {...args} />;

export const Default = Template.bind({});

export const IconColors = (): JSX.Element => (
    <div className="flex justify-evenly">
        <WarningIcon color="blue" />
        <WarningIcon color="red" />
    </div>
);

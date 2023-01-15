import { RefreshIcon } from "@library/icons";
import { Meta, Story } from "@storybook/react";

const meta: Meta = {
    title: "Icons/Refresh",
    component: RefreshIcon,
};

export default meta;

const Template: Story<typeof RefreshIcon> = (args) => <RefreshIcon {...args} />;

export const Default = Template.bind({});

export const IconColors = (): JSX.Element => (
    <div className="flex justify-evenly">
        <RefreshIcon color="blue" />
        <RefreshIcon color="red" />
    </div>
);

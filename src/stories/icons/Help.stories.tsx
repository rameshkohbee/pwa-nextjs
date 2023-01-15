import { HelpIcon } from "@library/icons";
import { Meta, Story } from "@storybook/react";

const meta: Meta = {
    title: "Icons/Help",
    component: HelpIcon,
};

export default meta;

const Template: Story<typeof HelpIcon> = (args) => <HelpIcon {...args} />;

export const Default = Template.bind({});

export const IconColors = (): JSX.Element => (
    <div className="flex justify-evenly">
        <HelpIcon color="blue" />
        <HelpIcon color="red" />
    </div>
);

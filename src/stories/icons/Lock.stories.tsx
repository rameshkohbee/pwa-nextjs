import { LockIcon } from "@library/icons";
import { Meta, Story } from "@storybook/react";

const meta: Meta = {
    title: "Icons/Lock",
    component: LockIcon,
};

export default meta;

const Template: Story<typeof LockIcon> = (args) => <LockIcon {...args} />;

export const Default = Template.bind({});

export const IconColors = (): JSX.Element => (
    <div className="flex justify-evenly">
        <LockIcon color="blue" />
        <LockIcon color="red" />
    </div>
);

import { ShortInputIcon } from "@library/icons";
import { Meta, Story } from "@storybook/react";

const meta: Meta = {
    title: "Icons/ShortInput",
    component: ShortInputIcon,
};

export default meta;

const Template: Story<typeof ShortInputIcon> = (args) => (
    <ShortInputIcon {...args} />
);

export const Default = Template.bind({});

export const IconColors = (): JSX.Element => (
    <div className="flex justify-evenly">
        <ShortInputIcon color="blue" />
        <ShortInputIcon color="red" />
    </div>
);

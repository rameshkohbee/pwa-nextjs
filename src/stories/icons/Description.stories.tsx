import { DescriptionIcon } from "@library/icons";
import { Meta, Story } from "@storybook/react";

const meta: Meta = {
    title: "Icons/Description",
    component: DescriptionIcon,
};

export default meta;

const Template: Story<typeof DescriptionIcon> = (args) => (
    <DescriptionIcon {...args} />
);

export const Default = Template.bind({});

export const IconColors = (): JSX.Element => (
    <div className="flex justify-evenly">
        <DescriptionIcon color="blue" />
        <DescriptionIcon color="red" />
    </div>
);

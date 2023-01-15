import { StarIcon } from "@library/icons";
import { Meta, Story } from "@storybook/react";

const meta: Meta = {
    title: "Icons/Star",
    component: StarIcon,
};

export default meta;

const Template: Story<typeof StarIcon> = (args): JSX.Element => (
    <StarIcon {...args} />
);

export const Default = Template.bind({});

export const IconColors = (): JSX.Element => (
    <div className="flex justify-evenly">
        <StarIcon color="blue" />
        <StarIcon color="red" />
    </div>
);

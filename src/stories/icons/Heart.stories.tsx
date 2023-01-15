import { HeartIcon, iconProps } from "@library/icons";
import { Meta, Story } from "@storybook/react";

const meta: Meta = {
    title: "Icons/Heart",
    component: HeartIcon,
};

export default meta;

const Template: Story<iconProps> = (args) => <HeartIcon {...args} />;

export const Default = Template.bind({});

export const IconVariants = (): JSX.Element => (
    <div className="flex justify-evenly">
        <HeartIcon variant="solid" />
        <HeartIcon variant="outline" />
    </div>
);
export const IconColors = (): JSX.Element => (
    <div className="flex justify-evenly">
        <HeartIcon color="blue" variant="solid" />
        <HeartIcon color="blue" variant="outline" />
        <HeartIcon color="red" variant="solid" />
        <HeartIcon color="red" variant="outline" />
    </div>
);

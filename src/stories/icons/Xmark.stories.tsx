import { XmarkIcon } from "@library/icons";
import { Meta, Story } from "@storybook/react";

const meta: Meta = {
    title: "Icons/Xmark",
    component: XmarkIcon,
};

export default meta;

const Template: Story<typeof XmarkIcon> = (args) => <XmarkIcon {...args} />;

export const Default = Template.bind({});

export const IconVariants = (): JSX.Element => (
    <div className="flex justify-evenly">
        <XmarkIcon variant="normal" />
        <XmarkIcon variant="outline" />
        <XmarkIcon variant="solid" />
    </div>
);
export const IconColors = (): JSX.Element => (
    <div className="flex justify-evenly">
        <XmarkIcon color="blue" variant="normal" />
        <XmarkIcon color="blue" variant="outline" />
        <XmarkIcon color="blue" variant="solid" />
        <XmarkIcon color="red" variant="normal" />
        <XmarkIcon color="red" variant="outline" />
        <XmarkIcon color="red" variant="solid" />
    </div>
);

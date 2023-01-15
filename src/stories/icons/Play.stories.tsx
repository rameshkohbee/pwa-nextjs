import { PlayIcon } from "@library/icons";
import { Meta, Story } from "@storybook/react";

const meta: Meta = {
    title: "Icons/Play",
    component: PlayIcon,
};

export default meta;

const Template: Story<typeof PlayIcon> = (args) => <PlayIcon {...args} />;

export const Default = Template.bind({});

export const IconColors = (): JSX.Element => (
    <div className="flex justify-evenly">
        <PlayIcon color="blue" />
        <PlayIcon color="red" />
    </div>
);

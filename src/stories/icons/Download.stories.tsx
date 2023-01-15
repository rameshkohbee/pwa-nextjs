import { DownloadIcon } from "@library/icons";
import { Meta, Story } from "@storybook/react";

const meta: Meta = {
    title: "Icons/Download",
    component: DownloadIcon,
};

export default meta;

const Template: Story<typeof DownloadIcon> = (args) => (
    <DownloadIcon {...args} />
);

export const Default = Template.bind({});

export const IconColors = (): JSX.Element => (
    <div className="flex justify-evenly">
        <DownloadIcon color="blue" />
        <DownloadIcon color="red" />
    </div>
);

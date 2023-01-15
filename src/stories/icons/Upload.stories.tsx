import { UploadIcon } from "@library/icons";
import { Meta, Story } from "@storybook/react";

const meta: Meta = {
    title: "Icons/Upload",
    component: UploadIcon,
};

export default meta;

const Template: Story<typeof UploadIcon> = (args) => <UploadIcon {...args} />;

export const Default = Template.bind({});

export const IconColors = (): JSX.Element => (
    <div className="flex justify-evenly">
        <UploadIcon color="blue" />
        <UploadIcon color="red" />
    </div>
);

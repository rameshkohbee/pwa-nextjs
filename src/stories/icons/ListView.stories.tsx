import { ListViewIcon } from "@library/icons";
import { Meta, Story } from "@storybook/react";

const meta: Meta = {
    title: "Icons/ListView",
    component: ListViewIcon,
};

export default meta;

const Template: Story<typeof ListViewIcon> = (args) => (
    <ListViewIcon {...args} />
);

export const Default = Template.bind({});

export const IconColors = (): JSX.Element => (
    <div className="flex justify-evenly">
        <ListViewIcon color="blue" />
        <ListViewIcon color="red" />
    </div>
);

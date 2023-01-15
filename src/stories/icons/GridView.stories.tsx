import { GridViewIcon } from "@library/icons";
import { Meta, Story } from "@storybook/react";

const meta: Meta = {
    title: "Icons/GridView",
    component: GridViewIcon,
};

export default meta;

const Template: Story<typeof GridViewIcon> = (args) => (
    <GridViewIcon {...args} />
);

export const Default = Template.bind({});

export const IconColors = (): JSX.Element => (
    <div className="flex justify-evenly">
        <GridViewIcon color="blue" />
        <GridViewIcon color="red" />
    </div>
);

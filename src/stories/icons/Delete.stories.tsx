import { DeleteIcon } from "@library/icons";
import { Meta, Story } from "@storybook/react";

const meta: Meta = {
    title: "Icons/Delete",
    component: DeleteIcon,
};

export default meta;

const Template: Story<typeof DeleteIcon> = (args) => <DeleteIcon {...args} />;

export const Default = Template.bind({});

export const IconColors = (): JSX.Element => (
    <div className="flex justify-evenly">
        <DeleteIcon color="blue" />
        <DeleteIcon color="red" />
    </div>
);

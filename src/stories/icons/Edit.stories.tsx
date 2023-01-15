import { EditIcon } from "@library/icons";
import { Meta, Story } from "@storybook/react";

const meta: Meta = {
    title: "Icons/Edit",
    component: EditIcon,
};

export default meta;

const Template: Story<typeof EditIcon> = (args) => <EditIcon {...args} />;

export const Default = Template.bind({});

export const IconColors = (): JSX.Element => (
    <div className="flex justify-evenly">
        <EditIcon color="blue" />
        <EditIcon color="red" />
    </div>
);

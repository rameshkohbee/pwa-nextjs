import { PlusIcon } from "@library/icons";
import { Meta, Story } from "@storybook/react";

const meta: Meta = {
    title: "Icons/Plus",
    component: PlusIcon,
};

export default meta;

const Template: Story<typeof PlusIcon> = (args) => <PlusIcon {...args} />;

export const Default = Template.bind({});

export const IconVariants = (): JSX.Element => (
    <div className="flex justify-evenly">
        <PlusIcon variant="normal" />
        <PlusIcon variant="outline" />
        <PlusIcon variant="solid" />
    </div>
);
export const IconColors = (): JSX.Element => (
    <div className="flex justify-evenly">
        <PlusIcon color="blue" variant="normal" />
        <PlusIcon color="blue" variant="outline" />
        <PlusIcon color="blue" variant="solid" />
        <PlusIcon color="red" variant="normal" />
        <PlusIcon color="red" variant="outline" />
        <PlusIcon color="red" variant="solid" />
    </div>
);

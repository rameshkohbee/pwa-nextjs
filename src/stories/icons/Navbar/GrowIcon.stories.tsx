import { GrowIcon } from "@library/icons";
import { Meta, Story } from "@storybook/react";

const meta: Meta = {
    title: "Icons/Navbar/Grow",
    component: GrowIcon,
    argTypes: {
        variant: {
            options: ["active", "inactive"],
            defaultValue: "inactive",
        },
    },
};

export default meta;

const Template: Story<typeof GrowIcon> = (args) => <GrowIcon {...args} />;

export const Default = Template.bind({});

export const IconVariants = (): JSX.Element => (
    <div className="flex justify-evenly">
        <GrowIcon variant="active" />
        <GrowIcon variant="inactive" />
    </div>
);
export const IconColors = (): JSX.Element => (
    <div className="flex justify-evenly">
        <GrowIcon color="blue" variant="active" />
        <GrowIcon color="blue" variant="inactive" />
        <GrowIcon color="red" variant="active" />
        <GrowIcon color="red" variant="inactive" />
    </div>
);

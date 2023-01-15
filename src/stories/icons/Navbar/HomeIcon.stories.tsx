import { HomeIcon } from "@library/icons";
import { Meta, Story } from "@storybook/react";

const meta: Meta = {
    title: "Icons/Navbar/Home",
    component: HomeIcon,
    argTypes: {
        variant: {
            options: ["active", "inactive"],
            defaultValue: "active",
        },
    },
};

export default meta;

const Template: Story<typeof HomeIcon> = (args) => <HomeIcon {...args} />;

export const Default = Template.bind({});

export const IconVariants = (): JSX.Element => (
    <div className="flex justify-evenly">
        <HomeIcon variant="active" />
        <HomeIcon variant="inactive" />
    </div>
);
export const IconColors = (): JSX.Element => (
    <div className="flex justify-evenly">
        <HomeIcon color="blue" variant="active" />
        <HomeIcon color="blue" variant="inactive" />
        <HomeIcon color="red" variant="active" />
        <HomeIcon color="red" variant="inactive" />
    </div>
);

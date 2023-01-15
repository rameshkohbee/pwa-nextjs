import { ProfileIcon } from "@library/icons";
import { Meta, Story } from "@storybook/react";

const meta: Meta = {
    title: "Icons/Navbar/Profile",
    component: ProfileIcon,
    argTypes: {
        variant: {
            options: ["active", "inactive"],
            defaultValue: "inactive",
        },
    },
};

export default meta;

const Template: Story<typeof ProfileIcon> = (args) => <ProfileIcon {...args} />;

export const Default = Template.bind({});

export const IconVariants = (): JSX.Element => (
    <div className="flex justify-evenly">
        <ProfileIcon variant="active" />
        <ProfileIcon variant="inactive" />
    </div>
);
export const IconColors = (): JSX.Element => (
    <div className="flex justify-evenly">
        <ProfileIcon color="blue" variant="active" />
        <ProfileIcon color="blue" variant="inactive" />
        <ProfileIcon color="red" variant="active" />
        <ProfileIcon color="red" variant="inactive" />
    </div>
);

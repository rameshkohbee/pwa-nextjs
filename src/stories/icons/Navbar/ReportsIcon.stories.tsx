import { ReportsIcon } from "@library/icons";
import { Meta, Story } from "@storybook/react";

const meta: Meta = {
    title: "Icons/Navbar/Reports",
    component: ReportsIcon,
    argTypes: {
        variant: {
            options: ["active", "inactive"],
            defaultValue: "inactive",
        },
    },
};

export default meta;

const Template: Story<typeof ReportsIcon> = (args) => <ReportsIcon {...args} />;

export const Default = Template.bind({});

export const IconVariants = (): JSX.Element => (
    <div className="flex justify-evenly">
        <ReportsIcon variant="active" />
        <ReportsIcon variant="inactive" />
    </div>
);
export const IconColors = (): JSX.Element => (
    <div className="flex justify-evenly">
        <ReportsIcon color="blue" variant="active" />
        <ReportsIcon color="blue" variant="inactive" />
        <ReportsIcon color="red" variant="active" />
        <ReportsIcon color="red" variant="inactive" />
    </div>
);

import { UnfoldIcon } from "@library/icons";
import { Meta, Story } from "@storybook/react";

const meta: Meta = {
    title: "Icons/Unfold",
    component: UnfoldIcon,
    argTypes: {
        color: {
            defaultValue: "black",
        },
    },
};

export default meta;

const Template: Story<typeof UnfoldIcon> = (args): JSX.Element => (
    <UnfoldIcon {...args} />
);

export const Default = Template.bind({});

export const IconColors = (): JSX.Element => (
    <div className="flex justify-evenly">
        <UnfoldIcon color="blue" />
        <UnfoldIcon color="red" />
    </div>
);

import { BackArrowIcon } from "@library/icons";
import { Meta, Story } from "@storybook/react";

const meta: Meta = {
    title: "Icons/BackArrow",
    component: BackArrowIcon,
    argTypes: {
        color: {
            defaultValue: "#111111",
        },
    },
};

export default meta;

const Template: Story<typeof BackArrowIcon> = (args): JSX.Element => (
    <BackArrowIcon {...args} />
);

export const Default = Template.bind({});

export const IconColors = (): JSX.Element => (
    <div className="flex justify-evenly">
        <BackArrowIcon color="blue" />
        <BackArrowIcon color="red" />
    </div>
);

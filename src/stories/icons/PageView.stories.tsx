import { PageViewIcon } from "@library/icons";
import { Meta, Story } from "@storybook/react";

const meta: Meta = {
    title: "Icons/PageView",
    component: PageViewIcon,
};

export default meta;

const Template: Story<typeof PageViewIcon> = (args) => (
    <PageViewIcon {...args} />
);

export const Default = Template.bind({});

export const IconColors = (): JSX.Element => (
    <div className="flex justify-evenly">
        <PageViewIcon color="blue" />
        <PageViewIcon color="red" />
    </div>
);

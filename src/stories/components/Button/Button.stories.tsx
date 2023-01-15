import { Button } from "@components/button";
import { Meta, Story } from "@storybook/react";

const meta: Meta = {
    title: "Components/Button",
    component: Button,
    argTypes: {
        children: {
            defaultValue: "Button",
        },
    },
};

export default meta;

const Template: Story<typeof Button> = (args) => (
    <Button {...args}>Button</Button>
);

export const Default = Template.bind({});
// export const Default = <Button>Button</Button>

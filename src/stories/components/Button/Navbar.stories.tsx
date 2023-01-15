import { NavigationBar } from "@components/navigation-bar";
import { Meta } from "@storybook/react";

const meta: Meta = {
    title: "Components/Navbar",
    component: NavigationBar,
    argTypes: {
        children: {
            defaultValue: "NavigationBar",
        },
    },
};

export default meta;

// const Template: Story<typeof NavigationBar> = (args) => (
//     <NavigationBar {...args}>NavigationBar</NavigationBar>
// );

// export const Default = Template.bind({});

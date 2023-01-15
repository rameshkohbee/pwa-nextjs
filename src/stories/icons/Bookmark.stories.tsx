import { BookmarkIcon, iconProps } from "@library/icons";
import { Meta, Story } from "@storybook/react";

const meta: Meta = {
    title: "Icons/Bookmark",
    component: BookmarkIcon,
    argTypes: {
        variant: {
            defaultValue: "solid",
        },
        color: {
            defaultValue: "black",
        },
    },
};

export default meta;

const Template: Story<iconProps> = (args) => <BookmarkIcon {...args} />;

export const Default = Template.bind({});

export const IconVariants = (): JSX.Element => (
    <div className="flex justify-evenly">
        <BookmarkIcon variant="solid" />
        <BookmarkIcon variant="outline" />
    </div>
);
export const IconColors = (): JSX.Element => (
    <div className="flex justify-evenly">
        <BookmarkIcon color="blue" variant="solid" />
        <BookmarkIcon color="blue" variant="outline" />
        <BookmarkIcon color="red" variant="solid" />
        <BookmarkIcon color="red" variant="outline" />
    </div>
);

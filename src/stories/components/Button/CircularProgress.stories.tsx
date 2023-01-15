import { CircularProgress } from "@components/circular-progress";
import { Text } from "@components/text";
import { Meta, Story } from "@storybook/react";

const meta: Meta = {
    title: "Components/CircularProgress",
    component: CircularProgress,
    args: {
        size: 128,
        value: 25,
        max: 100,
        trackWidth: 7,
        indicatorCap: "round",
    },
};

export default meta;

const Template: Story<typeof CircularProgress> = (args) => (
    <CircularProgress {...args}>
        <Text t="3 Questions" style="subtextSmall" />
        <Text t={`1/3 done`} style="smalltext !font-normal" />
    </CircularProgress>
);

export const Default = Template.bind({});

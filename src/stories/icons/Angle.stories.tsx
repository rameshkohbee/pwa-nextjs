import { AngleIcon } from "@library/icons";
import { Meta, Story } from "@storybook/react";

const meta: Meta = {
    title: "Icons/Angle",
    component: AngleIcon,
    argTypes: {
        type: {
            defaultValue: "left",
        },
        color: {
            defaultValue: "#111111",
        },
    },
};

export default meta;

const Template: Story<typeof AngleIcon> = (args): JSX.Element => (
    <AngleIcon {...args} />
);

export const Default = Template.bind({});

export const Icontypes = (): JSX.Element => (
    <div className="flex justify-evenly">
        <AngleIcon type="left" />
        <AngleIcon type="right" />
    </div>
);
export const IconColors = (): JSX.Element => (
    <div className="flex justify-evenly">
        <AngleIcon color="#E7E7E7" type="left" />
        <AngleIcon color="#E7E7E7" type="right" />
        <AngleIcon color="red" type="left" />
        <AngleIcon color="red" type="right" />
        <AngleIcon color="blue" type="left" />
        <AngleIcon color="blue" type="right" />
    </div>
);

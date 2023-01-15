import { ProgressBar } from "@components/progress-bar";
import { Meta, Story } from "@storybook/react";
import { useEffect, useRef, useState } from "react";

const meta: Meta = {
    title: "Components/ProgrssBar",
    component: ProgressBar,
    argTypes: {
        value: {
            defaultValue: 20,
        },
        max: {
            defaultValue: 100,
        },
        bgColor: {
            defaultValue: "#B8F2E3",
        },
        fillColor: {
            defaultValue: "#4DB6AC",
        },
    },
};

export default meta;

const Template: Story<typeof ProgressBar> = (args) => (
    <ProgressBar {...args}>ProgressBar</ProgressBar>
);

export const Default = Template.bind({});

export const Animation = (): JSX.Element => {
    const [count, setCount] = useState<number>(10);
    const [fillColor, setFillColor] = useState<string>("var(--accent-color)");
    const countId = useRef<any>();
    useEffect(() => {
        countId.current = setInterval(() => {
            setCount((pre) => pre - 1);
        }, 1000);
        if (count <= 0) {
            clearInterval(countId.current);
            setFillColor("var(--accent-color)");
        }
        if (count == Math.floor(10 / 2)) {
            setFillColor("#E03131");
        }

        return () => {
            clearInterval(countId.current);
        };
    }, [count]);
    return (
        <ProgressBar
            value={count}
            max={10}
            fillColor={fillColor}
            bgColor={"#E1E1E1"}
        ></ProgressBar>
    );
};

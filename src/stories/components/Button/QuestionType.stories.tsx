import { QuestionType } from "@components/question-type";
import { Meta, Story } from "@storybook/react";

const meta: Meta = {
    title: "Components/QuestionType",
    component: QuestionType,
};

export default meta;

const Template: Story<typeof QuestionType> = (args): JSX.Element => (
    <QuestionType {...args} />
);

export const Default = Template.bind({});

export const QuestionTypes = (): JSX.Element => (
    <div className="flex justify-evenly">
        <QuestionType type="MULTIPLECHOICE" />
        <QuestionType type="MULTIPLESELECT" />
        <QuestionType type="SUBJECTIVE" />
    </div>
);

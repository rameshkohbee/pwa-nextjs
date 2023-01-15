import { Section } from "../models/kohbee-quiz";
import { KohbeeQuizDetails } from "../models/kohbee-quiz-local";

export const getTotalQuestions = (sections: Section[]): number => {
    if (!sections?.length) {
        return 0;
    }
    // let total = 0;
    // total = sections?.reduce(
    //     (acc, section) => acc + section?.questions?.length,
    //     0,
    // );
    return sections[0]?.questions?.length || 0;

    // return total;
};
export const getTotalAttemptedQuestions = (
    quizDetails: KohbeeQuizDetails,
): number => {
    let total = 0;
    if (!quizDetails?.responses?.length) {
        return 0;
    } else {
        total = quizDetails?.responses?.reduce((acc, question): number => {
            if (question?.isAttempted === true) {
                return acc + 1;
            } else {
                return acc;
            }
        }, 0);
    }

    return total;
};

export const getIsBookmarked = (
    quizDetails: KohbeeQuizDetails,
    questionId: string,
): boolean => {
    if (quizDetails?.responses) {
        const prevQuestion = quizDetails?.responses.filter(
            (question) => question.questionId === questionId,
        );
        if (prevQuestion?.length) {
            if (prevQuestion[0]?.isBookmarked) {
                return true;
            } else {
                return false;
            }
        }
    }
    return false;
};

export const getFormatedTimelimit = (sec: number): string => {
    const min = Math.floor(sec / 60);
    sec -= min * 60;
    const second = Math.floor(sec);

    return `${min < 10 ? "0" + min : min}:${
        second < 10 ? "0" + second : second
    }`;
};

export const getWordLimit = (value: string): number => {
    const res: string[] = [];
    value
        .replace(/[\t\n\r]/gm, " ")
        .split(" ")
        .map((word) => {
            const trimed = word.trim();
            if (trimed.length > 0) {
                res.push(trimed);
            }
        });
    return res.length;
};

export const getQuestionType = {
    MULTIPLECHOICE: "Select one option",
    MULTIPLESELECT: "Select multiple options",
    SUBJECTIVE: "Write answer",
};

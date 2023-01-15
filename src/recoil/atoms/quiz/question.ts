import { Atoms } from "@recoil/constants";
import { atom } from "recoil";
import { KohbeeQuizQuestion } from "src/app/quiz/models/kohbee-question";

const defaultKohbeeQuizQuestion = {} as KohbeeQuizQuestion;

const kohbeeQuizQuestionState = atom({
    key: Atoms.KohbeeQuizQuestionAtom,
    default: defaultKohbeeQuizQuestion,
});

export default kohbeeQuizQuestionState;

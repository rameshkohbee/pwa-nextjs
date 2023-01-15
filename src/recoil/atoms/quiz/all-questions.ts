import { Atoms } from "@recoil/constants";
import { atom } from "recoil";
import { KohbeeQuizQuestion } from "src/app/quiz/models/kohbee-question";

const defaultKohbeeAllQuizQuestions = [] as KohbeeQuizQuestion[];

const kohbeeAllQuizQuestionsState = atom({
    key: Atoms.KohbeeAllQuestionsAtom,
    default: defaultKohbeeAllQuizQuestions,
});

export default kohbeeAllQuizQuestionsState;

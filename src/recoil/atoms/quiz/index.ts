import { Atoms } from "@recoil/constants";
import { atom } from "recoil";
import { KohbeeQuiz } from "src/app/quiz/models/kohbee-quiz";

const defaultKohbeeQuiz = {} as KohbeeQuiz;

const kohbeeQuizState = atom({
    key: Atoms.KohbeeQuizAtom,
    default: defaultKohbeeQuiz,
});

export default kohbeeQuizState;

import { Atoms } from "@recoil/constants";
import { atom } from "recoil";
import { KohbeeQuizResult } from "src/app/quiz/models/kohbee-quiz-result";

const defaultKohbeeQuizResult = {} as KohbeeQuizResult;

const kohbeeQuizResultState = atom({
    key: Atoms.KohbeeQuizResultAtom,
    default: defaultKohbeeQuizResult,
});

export default kohbeeQuizResultState;

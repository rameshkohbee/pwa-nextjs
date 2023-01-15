import { Atoms } from "@recoil/constants";
import { atom } from "recoil";
import { KohbeeQuizDetails } from "src/app/quiz/models/kohbee-quiz-local";

const defaultKohbeeQuizDetails = {} as KohbeeQuizDetails;

const kohbeeQuizDetailsState = atom({
    key: Atoms.KohbeeQuizDetailsAtom,
    default: defaultKohbeeQuizDetails,
});

export default kohbeeQuizDetailsState;

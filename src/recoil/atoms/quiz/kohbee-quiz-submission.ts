import { Atoms } from "@recoil/constants";
import { atom } from "recoil";
import { KohbeeQuizSubmission } from "src/app/quiz/models/kohbee-quiz-submission";

const defaultKohbeeQuizSubmission = {} as KohbeeQuizSubmission;

const kohbeeQuizSubmissionState = atom({
    key: Atoms.KohbeeQuizSubmissionAtom,
    default: defaultKohbeeQuizSubmission,
});

export default kohbeeQuizSubmissionState;

import { Atoms } from "@recoil/constants";
import { atom } from "recoil";
import { KohbeeSession } from "src/app/student-authentication/models/Kohbee-session/kohbee-session-model";

const defaultKohbeeSession = {} as KohbeeSession;

export const KohbeeSessionState = atom({
    key: Atoms.KohbeeSession,
    default: defaultKohbeeSession,
});

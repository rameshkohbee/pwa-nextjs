import { Atoms } from "@recoil/constants";
import { atom } from "recoil";
import { KohbeeStudent } from "src/models/kohbee-student";

const defaultKohbeeStudent = {} as KohbeeStudent;

export const kohbeeStudentState = atom({
    key: Atoms.KohbeeStudent,
    default: defaultKohbeeStudent,
});

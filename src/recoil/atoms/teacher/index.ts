import { Atoms } from "@recoil/constants";
import { atom } from "recoil";
import { KohbeeTeacher } from "src/models/kohbee-teacher";

const defaultTeacherData = {} as KohbeeTeacher;

export const teacherState = atom({
    key: Atoms.Creator,
    default: defaultTeacherData,
});

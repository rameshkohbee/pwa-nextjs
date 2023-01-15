import { Atoms } from "@recoil/constants";
import { atom } from "recoil";
import { KohbeeClass } from "src/models/kohbee-class";

const defaultClassData = {} as KohbeeClass;

export const classState = atom({
    key: Atoms.Class,
    default: defaultClassData,
});

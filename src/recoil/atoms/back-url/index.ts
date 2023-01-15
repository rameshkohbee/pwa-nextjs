import { atom } from "recoil";
import { Atoms } from "@recoil/constants";

export const backUrlState = atom({
    key: Atoms.BackUrl,
    default: "",
});

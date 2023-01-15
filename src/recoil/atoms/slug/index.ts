import { atom } from "recoil";
import { Atoms } from "@recoil/constants";

export const slugState = atom({
    key: Atoms.Slug,
    default: "",
});

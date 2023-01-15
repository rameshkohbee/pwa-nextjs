import { atom } from "recoil";
import { Atoms } from "@recoil/constants";

export const userIdState = atom({
    key: Atoms.UserId,
    default: "",
});

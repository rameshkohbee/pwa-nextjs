import { Atoms } from "@recoil/constants";
import { atom } from "recoil";
import { SourceUtm } from "src/models/kohbee-user-action";

const defaultSourceUtmState = {} as SourceUtm;

const sourceUtmState = atom({
    key: Atoms.SourceUtm,
    default: defaultSourceUtmState,
});

export default sourceUtmState;

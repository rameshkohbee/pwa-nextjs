import { Atoms } from "@recoil/constants";
import { atom } from "recoil";
import { KohbeeLead } from "src/models/kohbee-lead";

const defaultLeadState = {} as KohbeeLead;

const leadState = atom({
    key: Atoms.Lead,
    default: defaultLeadState,
});

export default leadState;

import { Atoms } from "@recoil/constants";
import { atom } from "recoil";
import { KohbeeWebsite } from "src/models/kohbee-website";

const defaultWebsiteState = {} as KohbeeWebsite;

const websiteState = atom({
    key: Atoms.Website,
    default: defaultWebsiteState,
});

export default websiteState;

import { Atoms } from "@recoil/constants";
import { atom } from "recoil";
import { KohbeeMarketingPoster } from "src/app/jan-hackathon/models/kohbee-marketing-poster";

const defaultKohbeeMarketingPoster = {} as KohbeeMarketingPoster;

export const KohbeeMarketingPosterState = atom({
    key: Atoms.KohbeeMarketingPoster,
    default: defaultKohbeeMarketingPoster,
});

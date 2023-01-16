import { Atoms } from "@recoil/constants";
import { atom } from "recoil";

const defaultPosterStage = 1 as number;

export const KohbeePosterStageState = atom({
  key: Atoms.KohbeePosterStage,
  default: defaultPosterStage,
});

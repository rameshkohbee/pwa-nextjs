import { Atoms } from "@recoil/constants";
import { atom } from "recoil";
import { KohbeeCurriculum } from "src/models/kohbee-curriculum";

const defaultCurriculumData = {} as KohbeeCurriculum;

export const curriculumState = atom({
    key: Atoms.Curriculum,
    default: defaultCurriculumData,
});

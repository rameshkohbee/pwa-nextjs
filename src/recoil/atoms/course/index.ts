import { Atoms } from "@recoil/constants";
import { atom } from "recoil";
import { KohbeeCourse } from "src/models/kohbee-course";

const defaultCourseData = {} as KohbeeCourse;

export const courseState = atom({
    key: Atoms.Course,
    default: defaultCourseData,
});

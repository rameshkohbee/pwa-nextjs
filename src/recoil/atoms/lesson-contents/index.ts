import { Atoms } from "@recoil/constants";
import { atom } from "recoil";
import { KohbeeLessonContent } from "src/app/course-viewer/model/kohbee-lesson-content";

const defaultLessonsData = [] as KohbeeLessonContent[];

export const lessonsState = atom({
    key: Atoms.Lessons,
    default: defaultLessonsData,
});

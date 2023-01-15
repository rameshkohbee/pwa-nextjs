import { Atoms } from "@recoil/constants";
import { atom } from "recoil";

const courseNavigatorState = atom({
    key: Atoms.CourseNavigator,
    default: [0, 0],
});

export default courseNavigatorState;

import { Atoms } from "@recoil/constants";
import { atom } from "recoil";
import { StudentAuthProps } from "src/app/student-authentication/models/student-authentication";

const defaultStudentAuthData = {} as StudentAuthProps;

export const studentAuthState = atom({
    key: Atoms.StudentAuth,
    default: defaultStudentAuthData,
});

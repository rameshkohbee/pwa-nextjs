import { Atoms } from "@recoil/constants";
import { atom } from "recoil";
import { KohbeePage } from "src/models/kohbee-page";

const defaultPageData = {} as KohbeePage;

export const pageDataState = atom({
    key: Atoms.PageData,
    default: defaultPageData,
});

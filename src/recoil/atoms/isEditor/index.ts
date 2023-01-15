import { Atoms } from "@recoil/constants";
import { atom } from "recoil";

const editorState = atom({
    key: Atoms.isEditor,
    default: false,
});

export default editorState;

import editorState from "@recoil/atoms/isEditor";
import { ReactNode } from "react";
import { useRecoilState } from "recoil";

export function Transition({
    children,
    transitionStyle,
    style,
}: {
    children: ReactNode;
    transitionStyle: string;
    style?: string;
}): JSX.Element {
    const [isEditor] = useRecoilState(editorState);
    return (
        <>
            {isEditor ? (
                <div className={style}>{children}</div>
            ) : (
                <div
                    className={style}
                    data-aos={transitionStyle}
                    data-aos-duration="800"
                    data-aos-once="true"
                >
                    {children}
                </div>
            )}
        </>
    );
}

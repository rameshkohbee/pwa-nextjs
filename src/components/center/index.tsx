import { ReactNode } from "react";

export function Center({
    children,
    style = "",
}: {
    children: ReactNode;
    style?: string;
}): JSX.Element {
    return (
        <div
            className={`flex flex-col justify-center items-center align-center ${style}`}
        >
            {children}
        </div>
    );
}

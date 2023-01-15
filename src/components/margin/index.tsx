import { ReactNode } from "react";

export function Margin({
    children,
    margin,
}: {
    children: ReactNode;
    margin: string;
}): JSX.Element {
    return <div className={margin}>{children}</div>;
}

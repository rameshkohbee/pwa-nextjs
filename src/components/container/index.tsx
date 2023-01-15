import { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }): JSX.Element {
    return <div className="flex flex-col">{children}</div>;
}

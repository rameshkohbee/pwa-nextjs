import { ReactNode } from "react";

export function PageLoader({ children }: { children: ReactNode }): JSX.Element {
    return <div>{children}</div>;
}

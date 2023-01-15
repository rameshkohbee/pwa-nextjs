import React, { MouseEventHandler, ReactNode } from "react";

export function GradientButton({
    className,
    children,
    isRounded,
    isAnimated,
    onClick,
}: {
    className?: string;
    children: ReactNode;
    isRounded?: boolean;
    isAnimated?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}): JSX.Element {
    return (
        <button
            className={`py-2  ${
                isAnimated ? "animate-gradient" : ""
            } bg-gradient-to-r from-accent-light-color  ${
                isAnimated ? "via-primary-mix-color" : ""
            } to-accent-dark-color subtextRegular text-white ${className} ${
                isRounded ? "rounded-md" : ""
            }`}
            onClick={onClick}
            style={{ backgroundSize: `${isAnimated ? "400% 400%" : ""}` }}
        >
            {children}
        </button>
    );
}

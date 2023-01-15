import React from "react";
import { iconProps } from "@library/icons";

const InfoIcon = ({
    color,
    variant = "outline",
    fontSize = "inherit",
    className = "",
}: iconProps): JSX.Element => {
    const outline = (
        <svg
            width="1.25em"
            height="1.25em"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`h-[1.25em] w-[1.25em] ${className}`}
            style={{ fontSize: fontSize }}
        >
            <path
                d="M9 5H11V7H9V5ZM9 9H11V15H9V9ZM10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z"
                fill={`${color ? color : "#111111"}`}
            />
        </svg>
    );

    const solid = (
        <svg
            width="1.25em"
            height="1.25em"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`h-[1.25em] w-[1.25em] ${className}`}
            style={{ fontSize: fontSize }}
        >
            <path
                d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V9H11V15ZM11 7H9V5H11V7Z"
                fill={`${color ? color : "black"}`}
            />
        </svg>
    );

    switch (variant) {
        case "outline":
            return outline;
        case "solid":
            return solid;
        default:
            return outline;
    }
};

export default InfoIcon;

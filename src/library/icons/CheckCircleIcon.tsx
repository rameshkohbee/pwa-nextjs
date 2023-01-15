import React from "react";
import { iconProps } from "@library/icons";

const CheckCircleIcon = ({
    color = "black",
    variant = "outline",
    fontSize = "inherit",
    className = "",
}: iconProps): JSX.Element => {
    const outline = (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`w-[1em] h-[1em] ${className}`}
            style={{ fontSize: fontSize, lineHeight: "inherit" }}
        >
            <path
                d="M14.59 5.58L8 12.17L4.41 8.59L3 10L8 15L16 7L14.59 5.58ZM10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.58 18 2 14.42 2 10C2 5.58 5.58 2 10 2C14.42 2 18 5.58 18 10C18 14.42 14.42 18 10 18Z"
                fill={color}
            />
        </svg>
    );

    const solid = (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`w-[1em] h-[1em] ${className}`}
            style={{ fontSize: fontSize, lineHeight: "inherit" }}
        >
            <path
                d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z"
                fill={color}
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

export default CheckCircleIcon;

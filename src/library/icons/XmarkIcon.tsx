import React from "react";

const XmarkIcon = ({
    color = "black",
    variant = "normal",
    fontSize = "inherit",
    className = "",
}: {
    color?: string;
    variant?: "normal" | "solid" | "outline";
    fontSize?: string;
    className?: string;
}): JSX.Element => {
    const normal = (
        <svg
            width="0.875em"
            height="0.875em"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`w-[0.875em] h-[0.875em] ${className}`}
            style={{ fontSize: fontSize }}
        >
            <path
                d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
                fill={color}
            />
        </svg>
    );

    const outline = (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`w-[1em] h-[1em] ${className}`}
            style={{ fontSize: fontSize }}
        >
            <path
                d="M12.59 6L10 8.59L7.41 6L6 7.41L8.59 10L6 12.59L7.41 14L10 11.41L12.59 14L14 12.59L11.41 10L14 7.41L12.59 6ZM10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z"
                fill={color}
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
            className={`w-[1.25em] h-[1.25em] ${className}`}
            style={{ fontSize: fontSize }}
        >
            <path
                d="M10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM15 13.59L13.59 15L10 11.41L6.41 15L5 13.59L8.59 10L5 6.41L6.41 5L10 8.59L13.59 5L15 6.41L11.41 10L15 13.59Z"
                fill={color}
            />
        </svg>
    );
    switch (variant) {
        case "normal":
            return normal;
        case "outline":
            return outline;
        case "solid":
            return solid;
        default:
            return normal;
    }
};

export default XmarkIcon;

import React from "react";

const WarningIcon = ({
    color = "black",
    fontSize = "inherit",
    className = "",
}: {
    color?: string;
    fontSize?: string;
    className?: string;
}): JSX.Element => {
    return (
        <svg
            width="1.3em"
            height="1.2em"
            viewBox="0 0 22 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`w-[1em] h-[1em] ${className}`}
            style={{ fontSize: fontSize }}
        >
            <path
                d="M0 19H22L11 0L0 19ZM12 16H10V14H12V16ZM12 12H10V8H12V12Z"
                fill={color}
            />
        </svg>
    );
};

export default WarningIcon;

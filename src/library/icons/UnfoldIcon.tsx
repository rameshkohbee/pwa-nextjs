import React from "react";

const UnfoldIcon = ({
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
            width="0.625em"
            height="1.125em"
            viewBox="0 0 10 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`h-[1.125em] w-[0.625em] ${className}`}
            style={{ fontSize: fontSize }}
        >
            <path
                d="M5.00003 2.83L8.17003 6L9.58003 4.59L5.00003 0L0.410034 4.59L1.83003 6L5.00003 2.83ZM5.00003 15.17L1.83003 12L0.420034 13.41L5.00003 18L9.59003 13.41L8.17003 12L5.00003 15.17Z"
                fill={color}
            />
        </svg>
    );
};

export default UnfoldIcon;

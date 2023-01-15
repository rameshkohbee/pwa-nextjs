import React from "react";

const HourglassIcon = ({
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
            width="0.8em"
            height="1.25em"
            viewBox="0 0 12 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`h-[1.25em] w-[0.8em] ${className}`}
            style={{ fontSize: fontSize }}
        >
            <path
                d="M0 0V6H0.0100002L0 6.01L4 10L0 14L0.0100002 14.01H0V20H12V14.01H11.99L12 14L8 10L12 6.01L11.99 6H12V0H0ZM10 14.5V18H2V14.5L6 10.5L10 14.5ZM6 9.5L2 5.5V2H10V5.5L6 9.5Z"
                fill={color}
            />
        </svg>
    );
};

export default HourglassIcon;

import React from "react";

const GridViewIcon = ({
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
            width="1.125em"
            height="1.125em"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`h-[1.125em] w-[1.125em] ${className}`}
            style={{ fontSize: fontSize }}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 0V8H8V0H0ZM6 6H2V2H6V6ZM0 10V18H8V10H0ZM6 16H2V12H6V16ZM10 0V8H18V0H10ZM16 6H12V2H16V6ZM10 10V18H18V10H10ZM16 16H12V12H16V16Z"
                fill={color}
            />
        </svg>
    );
};

export default GridViewIcon;

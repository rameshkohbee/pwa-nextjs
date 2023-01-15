import React from "react";

const ShortInputIcon = ({
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
            width="1em"
            height="0.375em"
            viewBox="0 0 16 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`h-[0.375em]] w-[1em] ${className}`}
            style={{ fontSize: fontSize }}
        >
            <path d="M0 0H16V2H0V0ZM0 4H10V6H0V4Z" fill={color} />
        </svg>
    );
};

export default ShortInputIcon;

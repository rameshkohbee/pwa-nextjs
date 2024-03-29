import React from "react";

const ClockIcon = ({
    color = "#E85A71",
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
            height="1em"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`h-[1em] w-[1em] ${className} `}
            style={{ fontSize: fontSize }}
        >
            <g clipPath="url(#clip0_305_148)">
                <path
                    d="M7.99337 1.33337C4.31337 1.33337 1.33337 4.32004 1.33337 8.00004C1.33337 11.68 4.31337 14.6667 7.99337 14.6667C11.68 14.6667 14.6667 11.68 14.6667 8.00004C14.6667 4.32004 11.68 1.33337 7.99337 1.33337ZM8.00004 13.3334C5.05337 13.3334 2.66671 10.9467 2.66671 8.00004C2.66671 5.05337 5.05337 2.66671 8.00004 2.66671C10.9467 2.66671 13.3334 5.05337 13.3334 8.00004C13.3334 10.9467 10.9467 13.3334 8.00004 13.3334Z"
                    fill={color}
                />
                <path
                    d="M8.33337 4.66663H7.33337V8.66663L10.8334 10.7666L11.3334 9.94663L8.33337 8.16663V4.66663Z"
                    fill="black"
                />
            </g>
            <defs>
                <clipPath id="clip0_305_148">
                    <rect width="16" height="16" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default ClockIcon;

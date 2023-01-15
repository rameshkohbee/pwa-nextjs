import React from "react";

const PageViewIcon = ({
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
            width="1.25em"
            height="1em"
            viewBox="0 0 20 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`h-[1em] w-[1.25em] ${className}`}
            style={{ fontSize: fontSize }}
        >
            <path
                d="M9.5 5C8.12 5 7 6.12 7 7.5C7 8.88 8.12 10 9.5 10C10.88 10 12 8.88 12 7.5C12 6.12 10.88 5 9.5 5ZM18 0H2C0.9 0 0 0.9 0 2V14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM14.79 14.21L11.88 11.3C11.19 11.74 10.37 12 9.49 12C7.01 12 5 9.99 5 7.5C5 5.01 7.01 3 9.5 3C11.99 3 14 5.01 14 7.5C14 8.38 13.74 9.19 13.3 9.89L16.21 12.79L14.79 14.21Z"
                fill={color}
            />
        </svg>
    );
};

export default PageViewIcon;

import React from "react";

const ListViewIcon = ({
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
            height="0.875"
            viewBox="0 0 18 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`h-[0.875em] w-[1.125em] ${className}`}
            style={{ fontSize: fontSize }}
        >
            <path
                d="M0 9H4V5H0V9ZM0 14H4V10H0V14ZM0 4H4V0H0V4ZM5 9H18V5H5V9ZM5 14H18V10H5V14ZM5 0V4H18V0H5Z"
                fill={color}
            />
        </svg>
    );
};

export default ListViewIcon;

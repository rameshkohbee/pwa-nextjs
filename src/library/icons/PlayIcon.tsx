import React from "react";

const PlayIcon = ({
    color = "black",
    className = "",
}: {
    color?: string;
    className?: string;
}): JSX.Element => {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM7.5 14.5V5.5L14.5 10L7.5 14.5Z"
                fill={color}
            />
        </svg>
    );
};

export default PlayIcon;
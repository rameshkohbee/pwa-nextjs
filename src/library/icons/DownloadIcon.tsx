import React from "react";

const DownloadIcon = ({
    color = "black",
    className = "",
}: {
    color?: string;
    className?: string;
}): JSX.Element => {
    return (
        <svg
            width="14"
            height="17"
            viewBox="0 0 14 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M0 17H14V15H0V17ZM14 6H10V0H4V6H0L7 13L14 6Z"
                fill={color}
            />
        </svg>
    );
};

export default DownloadIcon;
import React from "react";

const UploadIcon = ({
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
                d="M0 17H14V15H0V17ZM0 7H4V13H10V7H14L7 0L0 7Z"
                fill={color}
            />
        </svg>
    );
};

export default UploadIcon;

import React from "react";

const RefreshIcon = ({
    color = "#43A1D3",
    className = "",
}: {
    color?: string;
    className?: string;
}): JSX.Element => {
    return (
        <div>
            <svg
                width="16"
                height="20"
                viewBox="0 0 16 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={className}
            >
                <path
                    d="M7.99993 4.60001V7.30001L11.5999 3.70001L7.99993 0.100006V2.80001C4.02193 2.80001 0.799927 6.02201 0.799927 10C0.799927 11.413 1.21393 12.727 1.91593 13.834L3.22993 12.52C2.82493 11.773 2.59993 10.909 2.59993 10C2.59993 7.02101 5.02093 4.60001 7.99993 4.60001ZM14.0839 6.16601L12.7699 7.48001C13.1659 8.23601 13.3999 9.09101 13.3999 10C13.3999 12.979 10.9789 15.4 7.99993 15.4V12.7L4.39993 16.3L7.99993 19.9V17.2C11.9779 17.2 15.1999 13.978 15.1999 10C15.1999 8.58701 14.7859 7.27301 14.0839 6.16601Z"
                    fill={color}
                />
            </svg>
        </div>
    );
};

export default RefreshIcon;

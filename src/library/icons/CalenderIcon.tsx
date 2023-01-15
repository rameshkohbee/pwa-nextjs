import React from "react";

const CalenderIcon = ({
    color = "black",
    className = "",
    fontSize = "inherit",
}: {
    color?: string;
    className?: string;
    fontSize?: string;
}): JSX.Element => {
    return (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 18 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`h-[1em] w-[1em] ${className}`}
            style={{ fontSize: fontSize }}
        >
            <path
                d="M16 2H15V1C15 0.45 14.55 0 14 0C13.45 0 13 0.45 13 1V2H5V1C5 0.45 4.55 0 4 0C3.45 0 3 0.45 3 1V2H2C0.89 2 0.00999999 2.9 0.00999999 4L0 18C0 19.1 0.89 20 2 20H16C17.1 20 18 19.1 18 18V4C18 2.9 17.1 2 16 2ZM16 17C16 17.55 15.55 18 15 18H3C2.45 18 2 17.55 2 17V7H16V17ZM4 9H6V11H4V9ZM8 9H10V11H8V9ZM12 9H14V11H12V9Z"
                fill={color}
            />
        </svg>
    );
};

export default CalenderIcon;
import React from "react";

const RadioIcon = ({
    color = "black",
    type = "checked",
    fontSize = "inherit",
    className = "",
}: {
    color?: string;
    type?: "checked" | "unchecked";
    fontSize?: string;
    className?: string;
}): JSX.Element => {
    const unchecked = (
        <svg
            width="1.25em"
            height="1.25em"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`h-[1.25em]] w-[1.25em] ${className}`}
            style={{ fontSize: fontSize }}
        >
            <path
                d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.58 18 2 14.42 2 10C2 5.58 5.58 2 10 2C14.42 2 18 5.58 18 10C18 14.42 14.42 18 10 18Z"
                fill={color}
            />
        </svg>
    );

    const checked = (
        <svg
            width="1.25em"
            height="1.25em"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`h-[1.25em]] w-[1.25em] ${className}`}
            style={{ fontSize: fontSize }}
        >
            <path
                d="M10 5C7.24 5 5 7.24 5 10C5 12.76 7.24 15 10 15C12.76 15 15 12.76 15 10C15 7.24 12.76 5 10 5ZM10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.58 18 2 14.42 2 10C2 5.58 5.58 2 10 2C14.42 2 18 5.58 18 10C18 14.42 14.42 18 10 18Z"
                fill={color}
            />
        </svg>
    );

    switch (type) {
        case "unchecked":
            return unchecked;
        case "checked":
            return checked;
        default:
            return unchecked;
    }
};

export default RadioIcon;

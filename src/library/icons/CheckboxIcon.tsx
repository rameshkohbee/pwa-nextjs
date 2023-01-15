import React from "react";

const CheckboxIcon = ({
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
            width="1.125em"
            height="1.125em"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`w-[1.125em] h-[1.125em] ${className}`}
            style={{ fontSize: fontSize }}
        >
            <path
                d="M16 2V16H2V2H16ZM16 0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0Z"
                fill={color}
            />
        </svg>
    );

    const checked = (
        <svg
            width="1.125em"
            height="1.125em"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`w-[1.125em] h-[1.125em] ${className}`}
            style={{ fontSize: fontSize }}
        >
            <path
                d="M16 0H2C0.89 0 0 0.9 0 2V16C0 17.1 0.89 18 2 18H16C17.11 18 18 17.1 18 16V2C18 0.9 17.11 0 16 0ZM7 14L2 9L3.41 7.59L7 11.17L14.59 3.58L16 5L7 14Z"
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

export default CheckboxIcon;

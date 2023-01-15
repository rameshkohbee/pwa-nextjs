import React from "react";

const XmarkIcon = ({
    color = "black",
    variant = "normal",
    className = "",
}: {
    color?: string;
    variant?:
        | "normal"
        | "solid-circle"
        | "outline-circle"
        | "solid-square"
        | "outline-square";
    className?: string;
}): JSX.Element => {
    const normal = (
        <svg
            width="18"
            height="14"
            viewBox="0 0 18 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M6.00002 11.2L1.80002 7.00001L0.400024 8.40001L6.00002 14L18 2.00001L16.6 0.600006L6.00002 11.2Z"
                fill={color}
            />
        </svg>
    );

    const outlineCircle = (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M14.59 5.58L8 12.17L4.41 8.59L3 10L8 15L16 7L14.59 5.58ZM10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.58 18 2 14.42 2 10C2 5.58 5.58 2 10 2C14.42 2 18 5.58 18 10C18 14.42 14.42 18 10 18Z"
                fill="black"
            />
        </svg>
    );

    const solidCircle = (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z"
                fill="black"
            />
        </svg>
    );
    // const outlineSquare = (

    // )
    // const solidSquare = (

    // )
    switch (variant) {
        case "normal":
            return normal;
        case "outline-circle":
            return outlineCircle;
        case "solid-circle":
            return solidCircle;
        default:
            return normal;
    }
};

export default XmarkIcon;

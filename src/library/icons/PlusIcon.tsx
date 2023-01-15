import React from "react";

const PlusIcon = ({
    color = "black",
    variant = "normal",
    className = "",
}: {
    color?: string;
    variant?: "normal" | "solid" | "outline";
    className?: string;
}): JSX.Element => {
    const outline = (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M11 5H9V9H5V11H9V15H11V11H15V9H11V5ZM10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z"
                fill={color}
            />
        </svg>
    );

    const solid = (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM15 11H11V15H9V11H5V9H9V5H11V9H15V11Z"
                fill={color}
            />
        </svg>
    );
    const normal = (
        <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill={color} />
        </svg>
    );

    switch (variant) {
        case "normal":
            return normal;
        case "outline":
            return outline;
        case "solid":
            return solid;
        default:
            return normal;
    }
};

export default PlusIcon;

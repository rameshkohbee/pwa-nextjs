import React from "react";

const AngleIcon = ({
    color = "#111111",
    type = "left",
    className = "",
}: {
    color?: string;
    type?: "left" | "right";
    className?: string;
}): JSX.Element => {
    const left = (
        <svg
            width="12"
            height="20"
            viewBox="0 0 12 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M11.2892 2.45591L9.66668 0.833412L0.500018 10.0001L9.66668 19.1667L11.2892 17.5442L3.74502 10.0001L11.2892 2.45591Z"
                fill={color}
            />
        </svg>
    );

    const right = (
        <svg
            width="12"
            height="20"
            viewBox="0 0 12 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M0.710815 17.5441L2.33332 19.1666L11.5 9.99992L2.33332 0.833252L0.710815 2.45575L8.25498 9.99992L0.710815 17.5441Z"
                fill={color}
            />
        </svg>
    );

    switch (type) {
        case "left":
            return left;
        case "right":
            return right;
        default:
            return left;
    }
};

export default AngleIcon;

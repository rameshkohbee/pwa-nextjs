import React from "react";
import { iconProps } from "@library/icons";

const BookmarkIcon = ({
    color = "black",
    variant = "solid",
    fontSize = "inherit",
    className = "",
}: iconProps): JSX.Element => {
    const outline = (
        <svg
            width="1.25em"
            height="1.5em"
            viewBox="0 0 20 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`h-[1.5em] w-[1.25em] ${className}`}
            style={{ fontSize: fontSize }}
        >
            <path
                d="M16.6667 0H3.33332C1.86666 0 0.67999 1.2 0.67999 2.66667L0.666656 24L9.99999 20L19.3333 24V2.66667C19.3333 1.2 18.1333 0 16.6667 0ZM16.6667 20L9.99999 17.0933L3.33332 20V2.66667H16.6667V20Z"
                fill={color}
            />
        </svg>
    );

    const solid = (
        <svg
            width="1.25em"
            height="1.5em"
            viewBox="0 0 20 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`h-[1.5em] w-[1.25em] ${className}`}
            style={{ fontSize: fontSize }}
        >
            <path
                d="M16.6667 0H3.33334C1.86667 0 0.680005 1.2 0.680005 2.66667L0.666672 24L10 20L19.3333 24V2.66667C19.3333 1.2 18.1333 0 16.6667 0Z"
                fill={color}
            />
        </svg>
    );

    switch (variant) {
        case "outline":
            return outline;
        case "solid":
            return solid;
        default:
            return outline;
    }
};

export default BookmarkIcon;

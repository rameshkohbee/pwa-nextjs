import React from "react";

const ReportsIcon = ({
    color = "var(--primary-color)",
    variant = "inactive",
    className = "",
}: {
    color?: string;
    variant?: "active" | "inactive";
    className?: string;
}): JSX.Element => {
    const inactive = (
        <svg
            width="33"
            height="33"
            viewBox="0 0 33 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22.2259 24.8642C20.464 26.1046 18.3162 26.8329 16 26.8329C10.0213 26.8329 5.16711 21.9787 5.16711 16C5.16711 10.0213 10.0213 5.16713 16 5.16713C21.9787 5.16713 26.8329 10.0213 26.8329 16C26.8329 18.3162 26.1046 20.464 24.8642 22.2259C24.52 22.7148 24.6375 23.391 25.1263 23.7352C25.6152 24.0793 26.2914 23.9624 26.6356 23.473C28.1248 21.3585 29 18.7807 29 16C29 8.8252 23.1748 3 16 3C8.82519 3 3 8.8252 3 16C3 23.1748 8.82519 29 16 29C18.7807 29 21.3585 28.1248 23.473 26.6356C23.9624 26.2914 24.0793 25.6152 23.7352 25.1263C23.391 24.6375 22.7148 24.52 22.2259 24.8642Z"
                fill="#C0C0C0"
            />
            <path
                d="M18.585 11.985V13.125H20.1V14.505H18.495C18.335 15.455 17.94 16.145 17.31 16.575C16.69 17.005 15.75 17.22 14.49 17.22V18.015C14.49 18.485 14.585 18.855 14.775 19.125C14.975 19.395 15.31 19.53 15.78 19.53C16.23 19.53 16.555 19.405 16.755 19.155C16.955 18.895 17.055 18.52 17.055 18.03H19.005C18.985 19.04 18.7 19.815 18.15 20.355C17.6 20.885 16.815 21.15 15.795 21.15C14.735 21.15 13.925 20.865 13.365 20.295C12.805 19.725 12.525 18.895 12.525 17.805V15.81C13.595 15.81 14.385 15.785 14.895 15.735C15.405 15.675 15.785 15.555 16.035 15.375C16.285 15.195 16.45 14.905 16.53 14.505H12.045V13.125H16.605V11.985H12.045V10.515H20.1V11.985H18.585Z"
                fill="#C0C0C0"
            />
        </svg>
    );

    const active = (
        <svg
            width="33"
            height="33"
            viewBox="0 0 33 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22.8975 25.8182C20.9457 27.1924 18.5663 28 16 28C9.37712 28 4 22.6229 4 16C4 9.37712 9.37712 4 16 4C22.6229 4 28 9.37712 28 16C28 18.5663 27.1924 20.9457 25.8182 22.8975"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22.2259 24.8642C20.464 26.1046 18.3162 26.8329 16 26.8329C10.0213 26.8329 5.16711 21.9787 5.16711 16C5.16711 10.0213 10.0213 5.16713 16 5.16713C21.9787 5.16713 26.8329 10.0213 26.8329 16C26.8329 18.3162 26.1046 20.464 24.8642 22.2259C24.52 22.7148 24.6375 23.391 25.1263 23.7352C25.6152 24.0793 26.2914 23.9624 26.6356 23.473C28.1248 21.3585 29 18.7807 29 16C29 8.8252 23.1748 3 16 3C8.82519 3 3 8.8252 3 16C3 23.1748 8.82519 29 16 29C18.7807 29 21.3585 28.1248 23.473 26.6356C23.9624 26.2914 24.0793 25.6152 23.7352 25.1263C23.391 24.6375 22.7148 24.52 22.2259 24.8642Z"
                fill="#111111"
            />
            <path
                d="M18.585 11.985V13.125H20.1V14.505H18.495C18.335 15.455 17.94 16.145 17.31 16.575C16.69 17.005 15.75 17.22 14.49 17.22V18.015C14.49 18.485 14.585 18.855 14.775 19.125C14.975 19.395 15.31 19.53 15.78 19.53C16.23 19.53 16.555 19.405 16.755 19.155C16.955 18.895 17.055 18.52 17.055 18.03H19.005C18.985 19.04 18.7 19.815 18.15 20.355C17.6 20.885 16.815 21.15 15.795 21.15C14.735 21.15 13.925 20.865 13.365 20.295C12.805 19.725 12.525 18.895 12.525 17.805V15.81C13.595 15.81 14.385 15.785 14.895 15.735C15.405 15.675 15.785 15.555 16.035 15.375C16.285 15.195 16.45 14.905 16.53 14.505H12.045V13.125H16.605V11.985H12.045V10.515H20.1V11.985H18.585Z"
                fill="#111111"
            />
        </svg>
    );

    switch (variant) {
        case "inactive":
            return inactive;
        case "active":
            return active;
        default:
            return inactive;
    }
};

export default ReportsIcon;
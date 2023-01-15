import { ReactNode } from "react";
//TODO : css file
// import "./circular.css";
export function CircularProgress({
    size = 118,
    value = 25,
    max = 100,
    trackWidth = 7,
    trackColor = "#ddd",
    indicatorWidth = 7,
    indicatorColor = "#4DB6AC",
    indicatorCap = "round",
    spinnerMode = false,
    // spinnerSpeed = 1,
    children,
}: {
    size?: number;
    value?: number;
    max?: number;
    trackWidth?: number;
    trackColor?: string;
    indicatorWidth?: number;
    indicatorColor?: string;
    indicatorCap?: "round" | "square";
    spinnerMode?: boolean;
    // spinnerSpeed?: number;
    children?: ReactNode;
}): JSX.Element {
    value = value > max ? max : value < 0 ? 0 : value;
    const center = size / 2;
    const radius =
        center - (trackWidth > indicatorWidth ? trackWidth : indicatorWidth);
    const dashArray = 2 * Math.PI * radius;
    const dashOffset = dashArray * ((100 - (100 / max) * value) / 100);

    return (
        <>
            <div className="relative" style={{ width: size, height: size }}>
                <svg
                    className="-rotate-90 max-w-full align-middle"
                    style={{ width: size, height: size }}
                >
                    <circle
                        cx={center}
                        cy={center}
                        fill="transparent"
                        r={radius}
                        stroke={trackColor}
                        strokeWidth={trackWidth}
                    />
                    <circle
                        className={`svg-pi-indicator ${
                            spinnerMode ? "svg-pi-indicator--spinner" : ""
                        }`}
                        // style={{ animationDuration: spinnerSpeed * 1000 }}
                        cx={center}
                        cy={center}
                        fill="transparent"
                        r={radius}
                        stroke={indicatorColor}
                        strokeWidth={indicatorWidth}
                        strokeDasharray={dashArray}
                        strokeDashoffset={dashOffset || ""}
                        strokeLinecap={indicatorCap}
                    />
                </svg>

                <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-center">
                    {children}
                </div>

                <svg
                    width="14"
                    height="11"
                    viewBox="0 0 14 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-[9px] left-[43%]"
                >
                    <path
                        d="M6.13398 0.499999C6.51888 -0.166667 7.48112 -0.166667 7.86603 0.5L13.0622 9.5C13.4471 10.1667 12.966 11 12.1962 11L1.80385 11C1.03405 11 0.552922 10.1667 0.937822 9.5L6.13398 0.499999Z"
                        fill="#E85A71"
                    />
                </svg>
            </div>
        </>
    );
}

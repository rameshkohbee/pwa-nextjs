import { ReactNode } from "react";

export function ProgressBar({
    value = 20,
    max = 100,
    fillColor = "#4DB6AC",
    bgColor = "#B8F2E3",
    widthTransition = "width 1s linear",
    colorTransition = "color 1s linear",
}: {
    children?: ReactNode;
    value?: number;
    max?: number;
    fillColor?: string;
    bgColor?: string;
    widthTransition?: string;
    colorTransition?: string;
}): JSX.Element {
    return (
        <>
            <div
                className={`w-full rounded-lg overflow-hidden`}
                style={{ background: bgColor, transition: colorTransition }}
            >
                <div
                    aria-valuemax={max}
                    aria-valuemin={0}
                    aria-valuenow={value}
                    role="progress"
                    className={`rounded-lg h-[8px] ${
                        value <= 0
                            ? "aspect-square border border-transparant"
                            : ""
                    }`}
                    style={{
                        width: value <= 0 ? "auto" : `${(100 / max) * value}%`,
                        background: fillColor,
                        transition: widthTransition,
                    }}
                ></div>
            </div>
        </>
    );
}

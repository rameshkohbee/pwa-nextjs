/* eslint-disable  @typescript-eslint/no-non-null-assertion */
import { RefObject, useEffect, useRef, useState } from "react";
import * as lodash from "lodash";
import "katex/dist/katex.min.css";
import LatexText from "react-latex-next";
// import Color from "color";

export function Latex({
    t,
    style,
    maxLines,
    showReadmoreButton = true,
}: {
    t: string;
    style?: string;
    maxLines?: number;
    showReadmoreButton?: boolean;
}): JSX.Element {
    if (t == null || t == "") {
        return <div></div>;
    }

    const textRef = useRef<HTMLDivElement>(null);
    const [clamped, setClamped] = useState(true);
    const [showButton, setShowButton] = useState(false);

    const handleClick = () => setClamped(!clamped);

    const [textStyle, setTextStyle] = useState("");

    const clamp = {
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: maxLines!,
        overflow: "hidden",
        textOverflow: "ellipsis",
    };

    useEffect(() => {
        if (textRef != null) {
            calculateBgColor();
            if (!isHeaderFamily(style!)) {
                const hasClamping = (el) => {
                    const { clientHeight, scrollHeight } = el;
                    return clientHeight !== scrollHeight;
                };

                const checkButtonAvailability = () => {
                    if (textRef.current) {
                        // Save current state to reapply later if necessary.
                        // const hadClampClass =
                        //     textRef.current.style.webkitLineClamp ===
                        //     maxLines?.toString();
                        // Make sure that CSS clamping is applied if aplicable.
                        // if (!hadClampClass)
                        //     textRef.current.classList.add("clamp");
                        // Check for clamping and show or hide button accordingly.
                        setShowButton(hasClamping(textRef.current));
                        // Sync clamping with local state.
                        // if (!hadClampClass)
                        //     textRef.current.classList.remove("clamp");
                    }
                };

                const debouncedCheck = lodash.debounce(
                    checkButtonAvailability,
                    50,
                );

                checkButtonAvailability();
                window.addEventListener("resize", debouncedCheck);

                return () => {
                    window.removeEventListener("resize", debouncedCheck);
                };
            }
        } else {
            console.log("ref null");
        }
    }, [textRef]);

    function calculateBgColor() {
        let bgColor = "";
        let bgColorArray = [""];
        bgColor = getParentBgColor(textRef);
        bgColor = bgColor.substring(
            bgColor.indexOf("(") + 1,
            bgColor.indexOf(")"),
        );
        bgColorArray = bgColor.split(",");
        // console.log(textRef.current?.innerHTML);
        if (isHeaderFamily(style!)) {
            const ratioWhite = contrast(bgColorArray, [255, 255, 255]);
            const ratioBlack = contrast(bgColorArray, [0, 0, 0]);
            // console.log(bgColor, ratioWhite, ratioBlack);
            setTextStyle(
                ratioWhite > ratioBlack ? " text-white" : " text-black",
            );
        } else {
            const ratioLG = contrast(bgColorArray, [225, 225, 225]);
            const ratioDG = contrast(bgColorArray, [85, 85, 85]);
            // console.log(bgColor, ratioLG, ratioDG);
            if (Math.max(ratioDG, ratioLG) < 5) {
                const ratioLEG = contrast(bgColorArray, [245, 245, 245]);
                const ratioDEG = contrast(bgColorArray, [51, 51, 51]);
                // console.log(bgColor, ratioLEG, ratioDEG);
                setTextStyle(
                    ratioLEG > ratioDEG
                        ? " text-lighter-grey"
                        : " text-darker-grey",
                );
            } else {
                setTextStyle(
                    ratioLG > ratioDG ? " text-light-grey" : " text-dark-grey",
                );
            }
        }
    }

    function getClampStyle() {
        return clamped ? (isHeaderFamily(style!) ? {} : clamp) : {};
    }

    const isLatexText = (text: string) => {
        const latexChar = [
            `\\(`,
            `\\)`,
            `\\[`,
            `\\]`,
            `$`,
            `\\begin`,
            `\\end`,
            `{`,
            `}`,
        ];
        for (const char of latexChar) {
            if (text.includes(char)) {
                return true;
            }
        }
        return false;
    };

    function RenderLatex({ t }: { t: string }) {
        return (
            <>
                {isLatexText(t) ? (
                    <div className={style + textStyle}>
                        <div className="inline">
                            <LatexText>{t}</LatexText>
                        </div>
                    </div>
                ) : (
                    <div className={style + textStyle}>
                        <div className="inline">{t}</div>
                    </div>
                )}
            </>
        );
    }

    return (
        <div>
            <div ref={textRef} id="text-component" style={getClampStyle()}>
                <RenderLatex t={t}></RenderLatex>
            </div>
            {showReadmoreButton && showButton && maxLines !== undefined && (
                <button
                    className={`text-primary-color text-right ${getTypography(
                        style!,
                    )}`}
                    onClick={handleClick}
                >
                    Read {clamped ? "more" : "less"}
                </button>
            )}
        </div>
    );
}

function getTypography(style: string) {
    const styleArray = style.split(" ");
    for (let i = 0; i < styleArray.length; i++) {
        if (
            styleArray[i].includes("paragraph") ||
            styleArray[i].includes("subtext")
        ) {
            if (styleArray[i].includes("paragraph")) {
                styleArray[i] = styleArray[i].replace("paragraph", "subtext");
            }
            return styleArray[i];
        }
    }
}

function getParentBgColor(textRef: RefObject<HTMLDivElement>) {
    let color = "";
    let currentNode = textRef.current;
    let opacity = 0.0;
    while (currentNode !== null && currentNode !== undefined) {
        const currentColor =
            window.getComputedStyle(currentNode).backgroundColor;
        color = currentColor;
        // console.log(currentColor);
        if (color.startsWith("rgba(")) {
            const op = parseFloat(color.split(",")[3].slice(0, -1));
            if (op > 0) opacity = op;
        }

        if (color.startsWith("rgb(")) {
            if (opacity > 0) {
                // const clr = Color(color);
                // console.log(clr)
                // const bg = clr.blacken(opacity);
                // console.log(bg.hex())
                // console.log(clr)
            }
            return color;
        }
        currentNode = currentNode.parentElement! as HTMLDivElement;
    }
    return color;
}

function luminance(r, g, b) {
    const a = [r, g, b].map(function (v) {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function contrast(rgb1, rgb2) {
    const lum1 = luminance(rgb1[0], rgb1[1], rgb1[2]);
    const lum2 = luminance(rgb2[0], rgb2[1], rgb2[2]);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
}

function isHeaderFamily(style: string) {
    if (style == undefined) return false;
    return style.includes("header") || style.includes("bigtext") ? true : false;
}

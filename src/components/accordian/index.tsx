import React, { useState } from "react";
import { Text } from "@components";

export function Accordian({
    title,
    subtitle,
    isDark,
    style,
}: {
    title: string;
    isDark: boolean;
    subtitle: string;
    style?: string;
}): JSX.Element {
    const [open, setOpen] = useState(false);
    return (
        <div className={style}>
            <div
                className={` ${
                    isDark
                        ? "bg-secondary-black border-grey"
                        : "bg-white border-[#F3F4FE]"
                }  border  rounded-lg p-4 sm:p-8 lg:px-6 xl:px-8 mt-6 md:mt-10`}
            >
                <button
                    className="faq-btn w-full flex flex-row justify-between"
                    onClick={() => {
                        setOpen(!open);
                    }}
                >
                    <div className="">
                        <Text
                            t={title}
                            style={` ${
                                isDark ? "!text-white" : ""
                            } headerSmall text-left`}
                        ></Text>
                    </div>
                    <div className=" max-w-[40px] h-10 flex items-center justify-center rounded-lg bg-opacity-5">
                        <svg
                            width="17"
                            height="10"
                            viewBox="0 0 17 10"
                            className="fill-current icon"
                        >
                            <path
                                d="M7.28687 8.43257L7.28679 8.43265L7.29496 8.43985C7.62576 8.73124 8.02464 8.86001 8.41472 8.86001C8.83092 8.86001 9.22376 8.69083 9.53447 8.41713L9.53454 8.41721L9.54184 8.41052L15.7631 2.70784L15.7691 2.70231L15.7749 2.69659C16.0981 2.38028 16.1985 1.80579 15.7981 1.41393C15.4803 1.1028 14.9167 1.00854 14.5249 1.38489L8.41472 7.00806L2.29995 1.38063L2.29151 1.37286L2.28271 1.36548C1.93092 1.07036 1.38469 1.06804 1.03129 1.41393L1.01755 1.42738L1.00488 1.44184C0.69687 1.79355 0.695778 2.34549 1.0545 2.69659L1.05999 2.70196L1.06565 2.70717L7.28687 8.43257Z"
                                fill={isDark ? "#f1f1f1" : "#111111"}
                                stroke={isDark ? "#f1f1f1" : "#111111"}
                            />
                        </svg>
                    </div>
                </button>
                {open ? (
                    <div className=" py-2">
                        <Text t={subtitle} style="paragraphRegular"></Text>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

import Image from "next/image";
import React from "react";
import { Text } from "..";

export function NavigationBar({
    className,
    navItems = [],
    active = 0,
    onClick,
}: {
    className?: string;
    navItems?: {
        title: string;
        activeImgUrl: string;
        inactiveImgUrl: string;
    }[];
    active?: number;
    onClick: (index: any) => void;
}): JSX.Element {
    return (
        <nav>
            <ul
                className={`flex justify-evenly shadow-[0px_-4px_8px_rgba(0,0,0,0.15)] fixed bottom-0 left-0 right-0 py-2 ${className}`}
            >
                {navItems &&
                    navItems?.map((item, index) => (
                        <li
                            key={index}
                            className="flex flex-col justify-center"
                            style={{ transition: "all 1s ease-in-out" }}
                            onClick={() => onClick(index)}
                        >
                            <div className="m-auto w-[30px] h-[30px] md:w-[35px] md:h-[35px]">
                                <Image
                                    src={
                                        active === index
                                            ? item.activeImgUrl
                                            : item.inactiveImgUrl
                                    }
                                    width="100%"
                                    height="100%"
                                    alt={item.title}
                                    className="m-auto"
                                />
                            </div>
                            <Text
                                t={item.title}
                                style={`subtextSmall ${
                                    active === index
                                        ? "text-txt-color"
                                        : "!text-[#c0c0c0]"
                                }`}
                            />
                            <span
                                className={`w-full inline-block h-1 bg-primary-color rounded-sm ${
                                    active === index ? "visible" : "invisible"
                                }`}
                            ></span>
                        </li>
                    ))}
            </ul>
        </nav>
    );
}

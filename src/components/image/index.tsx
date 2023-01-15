/* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
import React, { useState } from "react";
import NextImage from "next/image";

export function LoadImage({
    src,
    style = "rounded-md",
    ...props
}): JSX.Element {
    const [isReady, setIsReady] = useState(false);

    const onLoadCallback = () => {
        setIsReady(true);
    };

    return (
        <NextImage
            objectFit="cover"
            src={src}
            {...props}
            className={`bg-card-block-color transition duration-700 ease-in-out	${
                isReady
                    ? "scale-100 bg-card-block-color blur-0"
                    : "scale-120 blur-2xl"
            } ${style}`}
            onLoadingComplete={onLoadCallback}
            layout="responsive"
        />
    );
}

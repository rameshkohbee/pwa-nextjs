import Image from "next/image";

export function ResponsiveImage({
    src,
    alt,
}: {
    src: string;
    alt: string;
}): JSX.Element {
    return (
        <Image
            layout="responsive"
            height="100%"
            width="100%"
            objectFit="contain"
            className="rounded-md"
            src={src}
            alt={alt}
            priority
        />
    );
}

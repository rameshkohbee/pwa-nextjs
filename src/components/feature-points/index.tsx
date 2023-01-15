import { Center, Text } from "..";
import Image from "next/image";

export function FeaturePoints({
    iconUrl,
    text,
    style,
}: {
    iconUrl: string;
    text: string;
    style: string;
}): JSX.Element {
    return (
        <div
            className={
                `bg-descriptive-block-color px-2 py-2 border-[0.5px] border-grey rounded-lg text-center flex-1  aspect-square max-w-[120px] ` +
                style
            }
        >
            <Center style=" h-full">
                <Image src={iconUrl} height="50px" width="50px"></Image>
                <Text t={text} style="smalltext mt-1"></Text>
            </Center>
        </div>
    );
}

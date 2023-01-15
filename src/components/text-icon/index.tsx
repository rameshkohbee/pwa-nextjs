import { Text } from "@components";
import Image from "next/image";
import { useWindowSize } from "react-use";

export function TextIcon({
    text,
    imageUrl,
}: {
    text: string;
    imageUrl: string;
}): JSX.Element {
    const { width } = useWindowSize();
    return (
        <div key={text} className="md:w-1/2">
            <div className="flex flex-col items-center">
                <div className="bg-white rounded-full w-[74px] h-[74px] md:w-[100px] md:h-[100px] grid place-content-center">
                    <Image
                        src={imageUrl}
                        width={width < 768 ? "40px" : "56px"}
                        height={width < 768 ? "40px" : "56px"}
                    ></Image>
                </div>
                <Text
                    t={text}
                    style="subtextSmall text-white mt-4 text-center mb-2"
                ></Text>
            </div>
        </div>
    );
}

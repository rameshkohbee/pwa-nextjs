import { Center, Text } from "@components";
import Image from "next/image";

export function BonusCard({
    buttonText,
    cardTitle,
    description,
    iconUrl,
}: {
    buttonText: string;
    cardTitle: string;
    description: string;
    iconUrl: string;
}): JSX.Element {
    return (
        <div className="rounded drop-shadow-lg bg-off-white max-w-xs my-5 px-4 h-48">
            <Center>
                <div className="-mt-4 text-white bg-primary-color py-1 px-7 rounded mb-2">
                    {cardTitle}
                </div>
                <Image src={iconUrl} width="40px" height="40px"></Image>
                <Center>
                    <Text
                        t={description}
                        style="subtextRegular text-center  mt-3"
                    ></Text>
                </Center>

                <div className="border rounded buttontext1 md:dbuttontext1 mt-4 mb-6 p-2 border-black">
                    {buttonText}
                </div>
            </Center>
        </div>
    );
}

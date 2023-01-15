import { Center, Margin, Text } from "@components";
import Image from "next/image";

export function Cards({
    imageUrl,
    title,
    description,
    iconUrl,
}: {
    imageUrl: string;
    title: string;
    description: string;
    iconUrl: string;
}): JSX.Element {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <div className="w-full">
                <Image src={imageUrl} />
            </div>
            <div className="flex flex-row justify-around items-center">
                <div className="basis-1/3  overflow-hidden">
                    <Center>
                        <Image
                            src={iconUrl}
                            width="75px"
                            height="75px"
                            className="rounded-full"
                        />
                    </Center>
                </div>
                <div className="basis-2/3 flex flex-col justify-center">
                    <Margin margin="">
                        <div className="pt-2">
                            <Text t={title} style="headerSmall" />
                        </div>
                    </Margin>
                    <Margin margin="">
                        <div className="pt-1 pb-4">
                            <Text t={description} style="paragraphSmall" />
                        </div>
                    </Margin>
                </div>
            </div>
        </div>
    );
}

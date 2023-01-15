import { ContentList } from "src/models/kohbee-website";
import { Text } from "..";
import Image from "next/image";

export function WebsiteFaq({ value }: { value: ContentList }): JSX.Element {
    return (
        <div className="bg-white px-4 py-4 rounded border-2">
            <details>
                <summary className="flex flex-row justify-between w-full items-center">
                    <Text style="subtextRegular" t={value.title}></Text>
                    <Image
                        src={"/icons/expand.svg"}
                        width="24px"
                        height="24px"
                    ></Image>
                </summary>
                <span>
                    <div className="">
                        <Text
                            t={value.subtitle}
                            style="paragraphRegular"
                        ></Text>
                    </div>
                </span>
            </details>
        </div>
    );
}

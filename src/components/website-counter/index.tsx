import { ContentList } from "src/models/kohbee-website";
import { Text } from "..";
import Image from "next/image";

export function WebsiteCounter({
    value,
    index,
}: {
    value: ContentList;
    index: number;
}): JSX.Element {
    function myFunction(str) {
        const ans = str.split(/([0-9]+)/);
        const digits = ans[1];
        let letters = null;
        if (ans.length > 2) letters = ans[2];
        return { letters, digits };
    }
    const { letters, digits } = myFunction(value.title ? value.title : "0k");
    return (
        <div className="w-4/5 md:w-2/5 lg:w-1/4 md:self-stretch">
            <div className="border-solid border box-border px-8 pb-12 pt-16 rounded-md drop-shadow-md h-full flex justify-center text-center bg-white relative overflow-hidden z-index-1">
                <div className="block">
                    <div className="bigtext text-primary-color !font-black">
                        <span className="">{digits}</span>
                        {letters}
                    </div>
                    <Text style="paragraphRegular" t={value.subtitle}></Text>
                </div>
                <div className="absolute bottom-0 left-0">
                    <Image
                        height={150}
                        width={150}
                        src={`/images/l6-counter-img${index + 1}.png`}
                        alt=""
                    />
                </div>
            </div>
        </div>
    );
}

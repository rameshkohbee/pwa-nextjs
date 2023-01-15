import useWindowDimensions from "@recoil/hooks/useWindowDimensions";
import Link from "next/link";
import { Course } from "src/models/kohbee-website";
import { Text, LoadImage } from "..";
import { Button } from "..";
export function WebsiteCourse({
    value,
    wsize,
    isEditor,
}: {
    value: Course;
    wsize: number;
    isEditor: boolean;
}): JSX.Element {
    const coursePageLink = `/offering?id=${encodeURIComponent(value.id)}`;
    const ratio = 16 / 9;
    const { width } = useWindowDimensions();
    wsize =
        wsize > 20 * (width > 768 ? 18 : 16)
            ? 20 * (width > 768 ? 18 : 16)
            : wsize;
    return (
        <Link
            href={isEditor ? "" : value.id ? `${coursePageLink}` : "/course"}
            scroll={isEditor ? false : true}
        >
            <div
                className="relative mb-4 flex flex-col rounded-md break-words border bg-white border-1 border-gray-300 transition-shadow hover:shadow-lg"
                style={{ width: wsize }}
            >
                {value.imageUrl != null && value.imageUrl.length > 0 ? (
                    <LoadImage
                        src={value.imageUrl}
                        height={wsize / ratio}
                        width={wsize}
                        alt="Card image cap"
                        style=" !rounded-t-md"
                    />
                ) : (
                    <div
                        style={{
                            width: wsize,
                            height: wsize / ratio,
                            backgroundColor: "var(--primary-color)",
                        }}
                        className="grid place-content-center text-center rounded-t-md"
                    >
                        <Text
                            t={value.name}
                            style="header text-white px-2"
                        ></Text>
                    </div>
                )}
                <div className="grow flex flex-col justify-between p-4">
                    <Text t={value.name} style="headerSmall pb-4"></Text>
                    <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-row justify-start">
                            {value.strikePrice != null && (
                                <Text
                                    t={
                                        value.strikePrice === 0
                                            ? ""
                                            : `₹${value.strikePrice}`
                                    }
                                    style="!text-primary-color paragraphRegular line-through mr-1"
                                ></Text>
                            )}
                            <Text
                                t={
                                    value.price === 0
                                        ? "FREE"
                                        : `₹${value.price}`
                                }
                                style="!text-primary-color subtextRegular"
                            ></Text>
                        </div>

                        <Button cardButton={true}>JOIN</Button>
                    </div>
                </div>
            </div>
        </Link>
    );
}

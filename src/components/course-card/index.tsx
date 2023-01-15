import Link from "next/link";
import Image from "next/image";
import { Text } from "..";
import { useWindowSize } from "react-use";
import { ContentList } from "src/models/kohbee-page";

export function CourseCard({
    value,
    wsize,
    isEditor,
}: {
    value: ContentList;
    wsize: number;
    isEditor: boolean;
}): JSX.Element {
    const ratio = 1 / 1;
    const { width } = useWindowSize();
    wsize =
        wsize > 20 * (width > 768 ? 20 : 18)
            ? 20 * (width > 768 ? 20 : 18)
            : wsize;
    return (
        <Link href={value.url} scroll={isEditor ? false : true}>
            <div
                className="mb-4 flex flex-col rounded break-words bg-card-block-color"
                style={{ width: wsize }}
            >
                <Image
                    className="rounded"
                    src={value.imageUrl}
                    height={wsize / ratio}
                    width={wsize}
                    objectFit="cover"
                    alt="Card image"
                />
                <div className="grow flex flex-col justify-between p-2">
                    <Text t={value.title} style="headerSmall pb-2"></Text>
                    <Text t={value.subtitle} style="paragraphRegular"></Text>
                </div>
            </div>
        </Link>
    );
}

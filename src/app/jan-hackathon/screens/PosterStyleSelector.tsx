import { Text } from "@components/text";
import { KohbeeMarketingPosterState } from "@recoil/atoms";
import { useRecoilState } from "recoil";

const PosterStyleSelector = ({
    handleSetStage,
}: {
    handleSetStage: (value: number) => void;
}): JSX.Element => {
    const [usePosterData, setPosterData] = useRecoilState(
        KohbeeMarketingPosterState,
    );
    const tempateStyle = [
        {
            id: 1,
            bg: "bg-[url('/images/marketingPoster/1_Vibes.png')]",
            boxStyle:
                "p-6 pt-8 cursor-pointer bg-[url('/images/marketingPoster/1_Vibes.png')] bg-cover max-w-[300px] min-w-[300px] aspect-square ",
            hookline: {
                style: "text-left !text-[#333333] text-[20px] font-[700] leading-[28px] uppercase pb-3",
            },
            description: {
                isVisible: true,
                style: "text-left !text-[#333333] text-[10.24px] font-[500] leading-[16px] tracking-[1.28]  uppercase",
            },
        },
        {
            id: 2,
            bg: "bg-[url('/images/marketingPoster/2_Dark.png')]",
            boxStyle:
                "p-6 pt-8 cursor-pointer bg-[url('/images/marketingPoster/2_Dark.png')] bg-cover max-w-[300px] min-w-[300px] aspect-square ",
            hookline: {
                style: "text-left !text-[#E7E7E7] text-[20px] font-[700] leading-[28px] uppercase pb-3",
            },
            description: {
                isVisible: true,
                style: "text-left !text-[#E7E7E7] text-[10.24px] font-[500] leading-[16px] tracking-[1.28]  uppercase",
            },
        },
        {
            id: 3,
            bg: "bg-[url('/images/marketingPoster/3_Pop.png')]",
            boxStyle:
                "p-4 pt-8 cursor-pointer bg-[url('/images/marketingPoster/3_Pop.png')] bg-cover max-w-[300px] min-w-[300px] aspect-square ",
            hookline: {
                style: "text-center !text-[#000000] text-[20px] font-[700] leading-[28px] pb-3 w-[95%] m-auto",
            },
            description: {
                isVisible: true,
                style: "text-center !text-[#000000] text-[10.24px] font-[500] leading-[16px] tracking-[1.28] ",
            },
        },
        {
            id: 4,
            bg: "bg-[url('/images/marketingPoster/4_Shoutout.png')]",
            boxStyle:
                "p-4 pt-[62px] cursor-pointer bg-[url('/images/marketingPoster/4_Shoutout.png')] bg-cover max-w-[300px] min-w-[300px] aspect-square ",
            hookline: {
                style: "text-center !text-[#333333] text-[20px] font-[700] leading-[28px]",
            },
            description: {
                isVisible: false,
                style: "",
            },
        },
    ];

    const handleSelectTemplate = (index: number) => {
        const selectedTemplateStyle = tempateStyle[index];
        setPosterData({
            ...usePosterData,
            selectedPosterStyle: selectedTemplateStyle,
        });
        if (selectedTemplateStyle?.bg) {
            handleSetStage(5);
        }
    };

    return (
        <div className="page-margin pb-4">
            <Text
                t="Choose a Style"
                style="header text-center mt-[112px] md:mt-[142px]"
            />
            <Text
                t="You can edit the colors and images later"
                style="paragraphRegular text-center mt-4"
            />
            <div className="mt-10 w-10/12 m-auto">
                <div className="w-full flex justify-center flex-wrap gap-8 ">
                    {tempateStyle?.map((poster, index) => (
                        <div
                            key={index}
                            className="drop-shadow-[0px_0px_8px_rgba(0,0,0,0.25)]"
                        >
                            <div
                                className={poster.boxStyle}
                                onClick={() => handleSelectTemplate(index)}
                            >
                                <div>
                                    <Text
                                        t={usePosterData.selectedHookline}
                                        style={`${poster.hookline?.style}`}
                                    />
                                </div>
                                {poster.description.isVisible && (
                                    <div>
                                        <Text
                                            t={
                                                usePosterData.selectedDescription
                                            }
                                            style={`${poster.description?.style}`}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export { PosterStyleSelector };

import { Button } from "@components/button";
import { Text } from "@components/text";
import { KohbeeMarketingPosterState } from "@recoil/atoms";
import { useRecoilValue } from "recoil";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCallback, useRef, useState } from "react";
import { toPng } from "html-to-image";

const PosterDownload = (): JSX.Element => {
    const usePosterData = useRecoilValue(KohbeeMarketingPosterState);
    const [loading, setLoading] = useState(false);
    const downloadRef = useRef<HTMLDivElement>(null);

    const handleDownloadPoster = useCallback(() => {
        if (downloadRef.current === null) {
            return;
        }
        setLoading(true);
        toPng(downloadRef.current, { cacheBust: true })
            .then((dataUrl) => {
                const link = document.createElement("a");
                link.download = `poster-${
                    usePosterData?.selectedPosterStyle?.id || 1
                }.png`;
                link.href = dataUrl;
                console.log(dataUrl);
                link.click();
            })
            .catch((err) => {
                console.log(err);
                toast.error("Something went wrong, please try again");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [downloadRef]);

    return (
        <div className="page-margin pb-4 ">
            <Text
                t="Ready to Go!"
                style="header text-center mt-[112px] md:mt-[142px]"
            />
            <Text
                t="Download and Share!"
                style="paragraphRegular text-center mt-4"
            />
            <div className="mt-10 flex justify-center">
                <div className="drop-shadow-[0px_0px_8px_rgba(0,0,0,0.25)]">
                    <div
                        ref={downloadRef}
                        className={usePosterData?.selectedPosterStyle?.boxStyle}
                    >
                        <div>
                            <Text
                                t={usePosterData.selectedHookline}
                                style={`${usePosterData?.selectedPosterStyle?.hookline?.style}`}
                            />
                        </div>
                        {usePosterData?.selectedPosterStyle?.description
                            .isVisible && (
                            <div>
                                <Text
                                    t={usePosterData.selectedDescription}
                                    style={`${usePosterData?.selectedPosterStyle?.description?.style}`}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="mt-28 grid grid-cols-12 gap-2 grid-rows-1">
                <Button
                    className="col-start-2 col-end-12 md:col-start-5 md:col-end-9 !bg-[#4DB6AC]"
                    onClick={handleDownloadPoster}
                    disabled={loading}
                    isLoading={loading}
                    loadingText={"Downloading..."}
                >
                    Download
                </Button>
            </div>
            <Text
                t="If you found this useful, Feel free to Tag us with @teamkohbee"
                style="mt-4 text-center smalltext"
            />
            <ToastContainer
                position="bottom-center"
                autoClose={2000}
                theme="dark"
                limit={2}
            />
        </div>
    );
};

export { PosterDownload };

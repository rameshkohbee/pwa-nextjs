import { Button } from "@components/button";
import { Center } from "@components/center";
import { Text } from "@components/text";
import { KohbeeSessionState } from "@recoil/atoms/kohbeeSession";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
function TimeItem({
    number,
    text,
}: {
    number: number;
    text: string;
}): JSX.Element {
    return (
        <div className="flex flex-col items-center">
            <div className="grid rounded-full w-[78px] h-[78px] bg-pure-white text-[32px] leading-12 place-content-center">
                {number}
            </div>
            <Text t={text} style="mt-2 text-white"></Text>
        </div>
    );
}

function OneTimeMaterial(): JSX.Element {
    const kohbeeSession = useRecoilValue(KohbeeSessionState);
    const [isOpenLink, setIsOpenLink] = useState(false);
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    let hh = 0,
        mm = 0,
        ss = 0;

    // console.log("kohbeeSession", kohbeeSession);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const dateTime = new Date();
            const startTime = (kohbeeSession?.tmsStart || 0o0) * 1000;
            const diff = startTime - dateTime.getTime();

            /**
             * 30 min = 1800000ms
             */
            if (diff < 1800000 && !isOpenLink) {
                setIsOpenLink(true);
            }
            let msec = diff;
            hh = Math.floor(msec / 1000 / 60 / 60);
            msec -= hh * 1000 * 60 * 60;
            mm = Math.floor(msec / 1000 / 60);
            msec -= mm * 1000 * 60;
            ss = Math.floor(msec / 1000);
            msec -= ss * 1000;
            setHour(hh);
            setMinute(mm);
            setSecond(ss);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [ss]);

    // useEffect(() => {
    //     console.log(kohbeeSession, kohbeeSession.startUrl);
    // }, []);

    return (
        <div className="section-margin flex flex-col items-center">
            <div className="w-9/10 md:w-2/5 lg:1/5">
                <div className="bg-accent-color rounded cursor-pointer">
                    <Center>
                        <Text
                            t="One Time Material"
                            style="header m-4 text-white text-center"
                        ></Text>
                        <div className="border-2 border-white w-2/5 mb-4"></div>
                    </Center>
                    <div className="flex flex-row mb-6 justify-evenly">
                        <TimeItem number={hour} text="Hours" />
                        <TimeItem number={minute} text="Minutes" />
                        <TimeItem number={second} text="Seconds" />
                    </div>
                    <Center>
                        <a
                            target={"_blank"}
                            href={isOpenLink ? kohbeeSession?.startUrl : "#"}
                        >
                            <Button
                                className="mb-6"
                                bigButton={true}
                                disabled={!isOpenLink}
                            >
                                Class Link
                            </Button>
                        </a>
                    </Center>
                </div>
            </div>
        </div>
    );
}

export default OneTimeMaterial;

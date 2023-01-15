/* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
import { Button } from "@components/button";
import { Center } from "@components/center";
import { CircularProgress } from "@components/circular-progress";
import { Text } from "@components/text";
import {
    BackArrowIcon,
    CalenderIcon,
    ClockIcon,
    StarIcon,
} from "@library/icons";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import tailwindConfig from "tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig";
import { KohbeeQuiz } from "../models/kohbee-quiz";

import {
    getTotalAttemptedQuestions,
    getTotalQuestions,
} from "../quiz-utils/common";
import kohbeeQuizState from "@recoil/atoms/quiz";
import kohbeeQuizDetailsState from "@recoil/atoms/quiz/quiz-local";
import { useRouter } from "next/router";
import { currentTms } from "src/utils/common/time-utilites";
import { teacherState } from "@recoil/atoms";

const twFullConfig = resolveConfig(tailwindConfig);
const monthObj = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
export function AssignmentLanding({ handleSetStage }): JSX.Element {
    const router = useRouter();
    const kohbeeQuiz = useRecoilValue<KohbeeQuiz>(kohbeeQuizState);
    const [quizDetails, setQuizDetails] = useRecoilState(
        kohbeeQuizDetailsState,
    );
    const kohbeeTeacher = useRecoilValue(teacherState);
    const [isOpenTest, setIsOpenTest] = useState<boolean>(true);

    const deadlineTimerId = useRef<any>();
    const [day, setDay] = useState(0);
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    let dd = 0,
        hh = 0,
        mm = 0,
        ss = 0;

    const getDate = () => {
        const fullDate = new Date((kohbeeQuiz?.tmsDeadline || 0) * 1000);
        const date = fullDate.getDate();
        const month = fullDate.getMonth();
        const year = fullDate.getFullYear();

        let hours: number | string = fullDate.getHours();
        let minutes: number | string = fullDate.getMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? "0" + minutes : minutes;

        const deadlineTime = hours + ":" + minutes + " " + ampm;

        const deadlineDate = `${date} ${monthObj[month]}, ${year}`;

        return kohbeeQuiz?.tmsDeadline
            ? { deadlineDate, deadlineTime }
            : { deadlineDate: "", deadlineTime: "" };
    };

    useEffect(() => {
        if (kohbeeQuiz?.quizType !== "OPENQUIZ") {
            if (currentTms() < kohbeeQuiz?.tmsPublish) {
                setIsOpenTest(false);
            } else {
                setIsOpenTest(true);
            }
            deadlineTimerId.current = setInterval(() => {
                const dateTime = new Date();
                const startTime = (kohbeeQuiz?.tmsDeadline || 0o0) * 1000;
                const diff = startTime - dateTime.getTime();
                if (diff <= 0) {
                    resetTimer();
                    return;
                }
                if (currentTms() >= kohbeeQuiz?.tmsPublish) {
                    setIsOpenTest(true);
                }
                let msec = diff;
                dd = Math.floor(msec / 1000 / 24 / 60 / 60);
                msec -= dd * 1000 * 24 * 60 * 60;
                hh = Math.floor(msec / 1000 / 60 / 60);
                msec -= hh * 1000 * 60 * 60;
                mm = Math.floor(msec / 1000 / 60);
                msec -= mm * 1000 * 60;
                ss = Math.floor(msec / 1000);
                msec -= ss * 1000;
                setDay(dd);
                setHour(hh);
                setMinute(mm);
                setSecond(ss);
            }, 1000);
        }
        return () => clearInterval(deadlineTimerId.current);
    }, [ss, kohbeeQuiz]);

    const resetTimer = () => {
        clearInterval(deadlineTimerId.current);
        setIsOpenTest(false);
        setDay(0);
        setHour(0);
        setMinute(0);
        setSecond(0);
    };
    const FormatedTime = (): JSX.Element => {
        let time = "";
        switch (kohbeeQuiz?.quizType) {
            case "OPENQUIZ":
                clearInterval(deadlineTimerId.current);
                time = "None";
                break;
            case "ASSIGNMENT":
                time = `${day ? day : ""} ${
                    day == 1 ? "Day" : day ? "Days" : ""
                } ${hour ? hour : ""} ${
                    hour == 1 ? "Hr" : hour ? "Hrs" : ""
                } ${minute} ${minute <= 1 ? "Min" : "Mins"} ${second} ${
                    second <= 1 ? "Sec" : "Secs"
                }`;

                if (day === 0 && hour === 0 && minute === 0 && second === 0) {
                    time = "Ended";
                }
                break;
            case "TIMEDTEST":
                //TODO : need to add quizTimeLimit in database
                clearInterval(deadlineTimerId.current);
                time = "2 Hrs";
                break;

            default:
                clearInterval(deadlineTimerId.current);
                time = "None";
        }

        return <Text t={time} style="smalltext text-center !text-[#E85A71]" />;
    };

    return (
        <div className="bg-secondary-black h-screen overflow-auto pb-[70px] pt-[80px] md:pt-[92px] ">
            <div className="w-full md:w-7/12 m-auto">
                <div className="bg-secondary-black md:w-9/12 m-auto margin-x flex justify-left py-4 pt-[40px] fixed top-0 left-0 right-0 z-10">
                    <button onClick={() => router.back()}>
                        <div className="flex items-center gap-3">
                            <BackArrowIcon color="white" className="h-[1rem]" />
                            <Text t="Back" style="subtextRegular" />
                        </div>
                    </button>
                </div>
                {kohbeeQuiz?.imageUrl ? (
                    <div className={`w-full`}>
                        <div className="w-full px-0 aspect-video overflow-hidden relative">
                            <Image
                                src={kohbeeQuiz?.imageUrl || ""}
                                alt="Quiz poster"
                                layout="fill"
                                objectFit="fill"
                                className="z-1"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="bg-[url('/images/quiz/posterBg.svg')] bg-cover w-full bg-[#43A1D3] px-0">
                        <div className="flex justify-between pt-2">
                            <div className="bg-secondary-black margin-l flex items-center gap-2 py-2 pr-3 rounded-r-[42px] subtextSmall">
                                <Text
                                    t={`${getTotalQuestions(
                                        kohbeeQuiz?.sections || [],
                                    )} Questions`}
                                    style="subtextSmall"
                                />
                                <div className="flex items-center gap-1">
                                    <StarIcon color="#FFCF30" />
                                    <Text
                                        t={`${kohbeeQuiz?.totalScore} Points`}
                                        style="subtextSmall"
                                    />
                                </div>
                            </div>
                            <div className="bg-pure-white margin-r flex items-center gap-2 py-2 pl-3 rounded-l-[42px]">
                                <Text t="Free" style="subtextSmall uppercase" />
                            </div>
                        </div>
                        <div className="margin-x">
                            <Text
                                t={`${
                                    kohbeeQuiz?.title
                                        ? kohbeeQuiz?.title
                                        : "Test your Yoga know how with this simple Quiz!"
                                }`}
                                style="headerSmall py-2"
                            />
                            <div className="flex justify-center items-center gap-4 pb-3  flex-wrap">
                                <div className="h-[89px] w-[89px]">
                                    <div className="h-full w-full rounded-full overflow-hidden bg-[url('/images/quiz/pictureUpload.svg')] bg-cover"></div>
                                </div>
                                <div className="p-2 flex-1 rounded-lg bg-pure-white">
                                    <Text
                                        t={`${
                                            kohbeeTeacher?.firstName ??
                                            "[Teacher Name]"
                                        }`}
                                        style="subtextSmall mb-[6px]"
                                    />
                                    <div className="bg-[#4DB6AC] rounded-3xl p-1 inline-block">
                                        <Text
                                            t={`${
                                                kohbeeQuiz?.quizType
                                                    ? kohbeeQuiz?.quizType
                                                    : "Assignment"
                                            }`}
                                            style="smalltext !text-pure-white"
                                        />
                                    </div>

                                    {kohbeeQuiz?.quizType === "ASSIGNMENT" && (
                                        <div className="flex gap-2 items-end mt-2 flex-wrap min-h-[12px]">
                                            <div className="flex gap-1 smalltext items-center">
                                                <CalenderIcon color="#E85A71" />
                                                <Text
                                                    t={`${
                                                        getDate().deadlineDate
                                                    }`}
                                                    style="smalltext"
                                                />
                                            </div>
                                            <div className="flex flex-1 gap-1 smalltext items-center">
                                                <div>
                                                    <ClockIcon color="#E85A71" />
                                                </div>
                                                <Text
                                                    t={`${
                                                        getDate().deadlineTime
                                                    }, IST`}
                                                    style="smalltext !break-keep block"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-start gap-1 pb-3 flex-wrap">
                                {kohbeeQuiz?.tags ? (
                                    kohbeeQuiz?.tags.map((tag, index) => (
                                        <div
                                            key={index}
                                            className="px-1 bg-[#1D797E]"
                                        >
                                            <Text
                                                t={`#${tag}`}
                                                style="smalltext uppercase"
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <>
                                        <div className="px-1 bg-[#1D797E]">
                                            <Text
                                                t="All Levels"
                                                style="smalltext uppercase"
                                            />
                                        </div>
                                        <div className="px-1 bg-[#1D797E]">
                                            <Text
                                                t="#testyourself"
                                                style="smalltext uppercase"
                                            />
                                        </div>
                                        <div className="px-1 bg-[#1D797E]">
                                            <Text
                                                t="Open to All"
                                                style="smalltext uppercase"
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                <div className="section-margin">
                    <Center>
                        <CircularProgress
                            value={
                                quizDetails?.responses?.length
                                    ? getTotalAttemptedQuestions(quizDetails)
                                    : 0
                            }
                            max={getTotalQuestions(kohbeeQuiz?.sections || [])}
                            trackColor={
                                twFullConfig.theme?.colors
                                    ? twFullConfig.theme?.colors["dark-grey"]
                                    : "#555555"
                            }
                        >
                            <Text
                                t={`${getTotalQuestions(
                                    kohbeeQuiz?.sections || [],
                                )} Questions`}
                                style="subtextSmall"
                            />
                            <Text
                                t={`${
                                    quizDetails?.responses?.length
                                        ? getTotalAttemptedQuestions(
                                              quizDetails,
                                          )
                                        : 0
                                }/${getTotalQuestions(
                                    kohbeeQuiz?.sections || [],
                                )} done`}
                                style="smalltext !font-normal"
                            />
                        </CircularProgress>
                        <Text
                            t={`${
                                kohbeeQuiz?.title
                                    ? kohbeeQuiz?.title
                                    : "Test your Yoga know how with this simple Quiz!"
                            }`}
                            style="header text-center mt-3 mb-3"
                        />
                        <div className="flex justify-center gap-2 flex-wrap subtextSmall mb-1">
                            <div className="flex items-center gap-1.5">
                                <StarIcon color="#FFCF30" />
                                <Text
                                    t={`${kohbeeQuiz?.totalScore} Points`}
                                    style="subtextSmall"
                                />
                            </div>
                            {kohbeeQuiz?.quizType &&
                                kohbeeQuiz?.quizType !== "OPENQUIZ" && (
                                    <>
                                        {kohbeeQuiz?.quizType ===
                                            "ASSIGNMENT" && (
                                            <div className="flex gap-1.5 items-center">
                                                <CalenderIcon color="#E85A71" />
                                                <Text
                                                    t={`Due on ${
                                                        getDate().deadlineDate
                                                    }`}
                                                    style="subtextSmall"
                                                />
                                            </div>
                                        )}
                                        {/* TODO : deadline timer  */}
                                        <div className="flex gap-1.5 items-center">
                                            <Text
                                                t="Deadline:"
                                                style="smalltext !text-[#E85A71]"
                                            />
                                            <FormatedTime />
                                        </div>
                                    </>
                                )}
                        </div>

                        <Text
                            style="paragraphSmall text-center mt-[40px]"
                            t={`${
                                kohbeeQuiz?.description
                                    ? kohbeeQuiz?.description
                                    : "This assignment has a deadline. Answer as many questions as you can! No negative marking. Passing Grade is 40% of total marks."
                            }`}
                        />
                    </Center>
                </div>
                <div className="md:w-7/12 m-auto bg-secondary-black grid grid-cols-12 gap-2 grid-rows-1 pb-6 pt-4 fixed bottom-0 left-0 right-0">
                    <Button
                        cardButton={true}
                        className={`col-start-2 col-end-12 ${
                            isOpenTest ? "!bg-accent-color" : "!bg-light-grey"
                        }`}
                        onClick={() => {
                            if (!quizDetails?.isStarted) {
                                setQuizDetails({
                                    ...quizDetails,
                                    isStarted: true,
                                });
                            }
                            handleSetStage(2);
                        }}
                        disabled={!isOpenTest}
                    >
                        <Text
                            t={
                                quizDetails?.isStarted
                                    ? "Resume Assignment"
                                    : "Start Assignment"
                            }
                        />
                    </Button>
                </div>
            </div>
        </div>
    );
}

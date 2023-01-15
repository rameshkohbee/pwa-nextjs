import { Button } from "@components/button";
import { Center } from "@components/center";
import { Text } from "@components/text";
import { BackArrowIcon, CheckCircleIcon } from "@library/icons";
import editorState from "@recoil/atoms/isEditor";
import kohbeeQuizState from "@recoil/atoms/quiz";
import kohbeeQuizSubmissionState from "@recoil/atoms/quiz/kohbee-quiz-submission";
import kohbeeQuizResultState from "@recoil/atoms/quiz/quiz-result";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useRecoilValue } from "recoil";
import { useRecoilState } from "recoil";
import { currentTms } from "src/utils/common/time-utilites";
import { KohbeeQuiz } from "../models/kohbee-quiz";
import { getQuizResultById } from "../services/get-quiz-result";
import { SubmissionResultReview } from "./SubmissionResultReview";
import Lottie from "react-lottie-player";
import Trophy_Lottie from "public/images/quiz/Trophy_Lottie.json";
import Done_Tick from "public/images/quiz/Done-Tick.json";
import QuizFailed from "public/images/quiz/QuizFailed.json";
interface resultProps {
    passingScore: number;
    passingPercentage: number;
    finalScore: number;
    finalPercentage: number;
}
export function AssignmentSubmission(): JSX.Element {
    const router = useRouter();
    const [reviewStage, setReviewStage] = useState<number>(0);
    const kohbeeQuiz = useRecoilValue<KohbeeQuiz>(kohbeeQuizState);
    const kohbeeSubmission = useRecoilValue(kohbeeQuizSubmissionState);
    const [isReviewed, setIsReviewed] = useRecoilState(editorState);
    const [result, setResult] = useState<resultProps>({
        passingScore: 0,
        passingPercentage: 0,
        finalScore: 0,
        finalPercentage: 0,
    });
    const [pageLoading, setPageLoading] = useState<boolean>(false);
    const [fetchResultLoading, setfetchResultLoading] =
        useState<boolean>(false);
    const [kohbeeQuizResult, setKohbeeQuizResult] = useRecoilState(
        kohbeeQuizResultState,
    );
    const [isAnimated, setIsAnimated] = useState<boolean>(false);
    const notifyTimerId = useRef<any>();
    const animationTimerId = useRef<any>();

    const handleReviewStage = () => {
        setPageLoading(true);
        if (kohbeeQuizResult?.quizId == kohbeeQuiz?.id) {
            setPageLoading(false);
            setReviewStage(1);
        } else {
            fetchResult();
            setPageLoading(false);
        }
    };
    const fetchResult = async () => {
        setfetchResultLoading(true);
        const QuizResult = await getQuizResultById(kohbeeQuiz.id);
        if (QuizResult != undefined && QuizResult.quizId == kohbeeQuiz.id) {
            setKohbeeQuizResult({ ...QuizResult });
            setfetchResultLoading(false);
        } else {
            setfetchResultLoading(false);
        }
    };
    const calculateResult = () => {
        const passingScore = kohbeeQuiz.passingPercentage
            ? Math.ceil(
                  (Number(kohbeeQuiz.totalScore) *
                      Number(kohbeeQuiz.passingPercentage)) /
                      100,
              )
            : 0;
        let finalPercentage = 0;
        if (isReviewed) {
            finalPercentage = kohbeeQuiz.passingPercentage
                ? Number(
                      (
                          (Number(kohbeeSubmission?.finalScore) * 100) /
                          Number(kohbeeQuiz.totalScore)
                      ).toFixed(2),
                  )
                : 0;
        }
        const payload = {
            passingPercentage: kohbeeQuiz.passingPercentage || 0,
            passingScore,
            finalScore: kohbeeSubmission?.finalScore || 0,
            finalPercentage: finalPercentage,
        };
        setResult({ ...payload });
    };

    useEffect(() => {
        calculateResult();
    }, [isReviewed]);

    useEffect(() => {
        if (kohbeeSubmission?.stage === "REVIEWED") {
            if (currentTms() >= kohbeeQuiz?.resultNotifyTime) {
                setIsReviewed(true);
            } else {
                setIsReviewed(false);
                /**
                 * @Info : Timer is used to watch notifyTime,
                 * so that we can display result after that pertucular time without refreshig page
                 */
                notifyTimerId.current = setInterval(() => {
                    if (currentTms() >= kohbeeQuiz?.resultNotifyTime) {
                        setIsReviewed(true);
                        console.log("done");
                        clearInterval(notifyTimerId.current);
                    }
                }, 1000);
            }
        } else {
            setIsReviewed(false);
        }
    }, []);

    useEffect(() => {
        if (isReviewed) {
            fetchResult();
        }
        return () => {
            clearInterval(notifyTimerId.current);
        };
    }, [isReviewed]);

    useEffect(() => {
        if (kohbeeQuiz?.passingPercentage) {
            animationTimerId.current = setTimeout(() => {
                setIsAnimated(true);
            }, 5000);
        }

        return () => clearTimeout(animationTimerId.current);
    }, []);

    if (pageLoading) {
        return (
            <div className="grid h-screen place-items-center bg-color-white">
                <ThreeDots
                    height="100"
                    width="100"
                    radius="10"
                    color={"var(--primary-color)"}
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    visible={true}
                />
            </div>
        );
    }
    const DoneTick = (): JSX.Element => {
        return (
            <div
                className={`${
                    isAnimated
                        ? "h-[56px] w-[56px] mt-[34px] mb-[20px]"
                        : "h-[160px] w-[160px] mt-[34px]"
                } transition-all ease-linear duration-200`}
            >
                {isAnimated ? (
                    <CheckCircleIcon
                        variant="solid"
                        fontSize="56px"
                        color="#4DB6AC"
                    />
                ) : (
                    <Lottie
                        loop
                        animationData={Done_Tick}
                        play
                        style={{ width: 160, height: 160 }}
                    />
                )}
            </div>
        );
    };

    switch (reviewStage) {
        case 1:
            return (
                <SubmissionResultReview
                    result={result}
                    setReviewStage={setReviewStage}
                />
            );
        default:
            return (
                <div
                    className={`bg-secondary-black h-screen overflow-auto ${
                        isReviewed ? "pb-[188px]" : "pb-[70px]"
                    } pt-[56px]`}
                >
                    <div className="bg-secondary-black margin-x flex justify-left py-4 pt-[40px] fixed top-0 left-0 right-0">
                        <button onClick={() => router.back()}>
                            <div className="flex items-center gap-3">
                                <BackArrowIcon
                                    color="white"
                                    className="h-[1rem]"
                                />
                                <Text t="Back" style="subtextRegular" />
                            </div>
                        </button>
                    </div>

                    <div className={`section-margin`}>
                        <Center>
                            <DoneTick />

                            <Text
                                t="Quiz Submitted Successfully!"
                                style="headerSmall text-center mb-10"
                            />
                            <Text
                                t={`${
                                    kohbeeQuiz?.title ? kohbeeQuiz?.title : ""
                                }`}
                                style="paragraphRegular text-center mb-1.5"
                            />
                            <div className="mb-6">
                                <div className="flex justify-center gap-1.5 flex-wrap mb-1 items-center">
                                    <Text
                                        t="Your Score:"
                                        style="paragraphSmall"
                                    />
                                    <Text
                                        t={`${
                                            isReviewed
                                                ? kohbeeQuiz.passingPercentage
                                                    ? `${result.finalPercentage}%(${result.finalScore} Points)`
                                                    : `${result.finalScore} Points`
                                                : "Review Pending"
                                        }`}
                                        style={`subtextSmall ${
                                            isReviewed ? "" : "!text-[#E03131]"
                                        }`}
                                    />
                                </div>
                                <div className="flex justify-center gap-2 flex-wrap mb-1 items-center">
                                    <Text
                                        t={
                                            kohbeeQuiz.passingPercentage
                                                ? `Passing Score:`
                                                : `Total Score`
                                        }
                                        style="paragraphSmall"
                                    />
                                    <Text
                                        t={
                                            kohbeeQuiz.passingPercentage
                                                ? `${result.passingPercentage}%(${result.passingScore} Points)`
                                                : `${kohbeeQuiz.totalScore} Points`
                                        }
                                        style="subtextSmall"
                                    />
                                </div>
                            </div>
                            {isReviewed ? (
                                kohbeeQuiz?.passingPercentage ? (
                                    <>
                                        <Text
                                            style={`subtextRegular text-center ${
                                                result.finalPercentage >=
                                                result.passingPercentage
                                                    ? "!text-[#4DB6AC]"
                                                    : "!text-[#E85A71]"
                                            }`}
                                            t={
                                                result.finalPercentage >=
                                                result.passingPercentage
                                                    ? "Congratulations! You have passed this Quiz!"
                                                    : "You failed this Quiz. Better luck next time."
                                            }
                                        />
                                        {isAnimated && (
                                            <div className="h-[160px] w-[160px] mt-[34px]">
                                                <Lottie
                                                    loop
                                                    animationData={
                                                        result.finalPercentage >=
                                                        result.passingPercentage
                                                            ? Trophy_Lottie
                                                            : QuizFailed
                                                    }
                                                    play
                                                    style={{
                                                        width: 160,
                                                        height: 160,
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <Text
                                        style={`subtextRegular text-center !text-[#4DB6AC]`}
                                        t="Congratulations! You have completed this quiz!"
                                    />
                                )
                            ) : (
                                <Text
                                    style="paragraphRegular text-center"
                                    t="You will be notified after your Submission has been reviewed by the Owner!"
                                />
                            )}
                        </Center>
                    </div>
                    <div
                        className={`bg-secondary-black grid grid-cols-12 gap-x-2 gap-y-3 grid-rows-${
                            isReviewed ? "3" : "1"
                        } pb-6 pt-4 fixed bottom-0 left-0 right-0`}
                    >
                        <Button
                            disabled={!isReviewed || fetchResultLoading}
                            className={`col-start-2 col-end-12 !font-semibold ${
                                isReviewed
                                    ? "!bg-secondary-black !text-[#4DB6AC] !border-2 border-[#4DB6AC]"
                                    : "!bg-light-grey"
                            }`}
                            isLoading={fetchResultLoading}
                            loadingText="Fetching Result"
                            onClick={handleReviewStage}
                        >
                            {kohbeeQuiz?.passingPercentage
                                ? "Review Quiz"
                                : "View Solutions"}
                        </Button>

                        {false && (
                            <>
                                {isReviewed && (
                                    <Button className="col-start-2 col-end-12 !bg-[#4DB6AC] !font-semibold">
                                        Claim certificate
                                    </Button>
                                )}
                                {isReviewed && (
                                    <Button className="col-start-2 col-end-12 !bg-[#E85A71] !font-semibold">
                                        share results
                                    </Button>
                                )}
                            </>
                        )}
                    </div>
                </div>
            );
    }
}

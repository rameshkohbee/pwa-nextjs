/* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
import { Button } from "@components/button";
import { Center } from "@components/center";
import { ProgressBar } from "@components/progress-bar";
import { Text } from "@components/text";
import kohbeeQuizState from "@recoil/atoms/quiz";
import kohbeeQuizDetailsState from "@recoil/atoms/quiz/quiz-local";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
    getTotalAttemptedQuestions,
    getTotalQuestions,
} from "../quiz-utils/common";
import { currentTms } from "src/utils/common/time-utilites";
import * as lodash from "lodash";
import { saveQuizSubmission } from "../services/save-quiz";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "tailwind.config";
import kohbeeQuizSubmissionState from "@recoil/atoms/quiz/kohbee-quiz-submission";

const twFullConfig = resolveConfig(tailwindConfig);

const getTailwindColor = (name: string, defaultValue: string) => {
    return twFullConfig.theme?.colors
        ? twFullConfig.theme?.colors[name]
        : defaultValue;
};

export function SubmissionReview({
    handleSubmissionReviewPage,
    handleSetStage,
}): JSX.Element {
    const kohbeeQuiz = useRecoilValue(kohbeeQuizState);
    const [quizDetails, setQuizDetails] = useRecoilState(
        kohbeeQuizDetailsState,
    );
    const setKohbeeSubmission = useSetRecoilState(kohbeeQuizSubmissionState);

    const [loading, setLoading] = useState<boolean>(false);
    const [totalAttemptedQuestions, setTotalAttemptedQuestions] =
        useState<number>(0);
    const [totalQuestions, setTotalQuestions] = useState<number>(0);

    useEffect(() => {
        const totalAttQuestions = getTotalAttemptedQuestions(quizDetails);
        setTotalAttemptedQuestions(totalAttQuestions);
        const tQuestions = getTotalQuestions(kohbeeQuiz?.sections || []);
        setTotalQuestions(tQuestions);
    }, []);

    const handleSubmitQuiz = async () => {
        setLoading(true);
        const data = lodash.cloneDeep(quizDetails);
        if (data?.responses) {
            const response = data?.responses.map(
                ({
                    questionId,
                    options,
                    answer,
                    hasTakenHint,
                    timeTaken,
                    markAwarded,
                    hasEvaluated,
                    isBookmarked,
                }) => {
                    return {
                        questionId,
                        options,
                        answer,
                        hasTakenHint,
                        timeTaken,
                        markAwarded,
                        hasEvaluated,
                        isBookmarked,
                    };
                },
            );

            const payload = {
                id: "",
                creatorId: data?.creatorId,
                studentId: data?.studentId,
                quizId: data?.quizId,
                responses: response,
                stage: "REVIEW_PENDING",
                tmsStart: data?.tmsTestStart,
                submissionStatus: "",
                tmsSubmit: currentTms(),
                certificateUrl: data?.certificateUrl,
                finalScore: data?.finalScore,
                creatorFeedback: data?.creatorFeedback,
                studentFeedback: "",
            };

            const submission = await saveQuizSubmission(payload);

            if (submission != undefined && submission?.status == "ok") {
                const newData = lodash.cloneDeep(quizDetails);
                setQuizDetails({ ...newData, isSubmitted: true });
                setKohbeeSubmission({ ...submission.submission });
                handleSetStage(3);
                return true;
            } else {
                alert("Something went wrong, please try again");
            }
            setLoading(false);
        }
    };

    const getGridBgColor = (questionId: string): string => {
        const gridColorObj = {
            isUnattempted: "bg-light-grey",
            isAttempted: "bg-[#76BBDF]",
            isInReview: "",
            isBookmarked: "",
        };

        let bgColor = "bg-light-grey";
        quizDetails?.responses?.length
            ? quizDetails?.responses?.filter((question) => {
                  if (question?.questionId === questionId) {
                      bgColor = question?.isAttempted
                          ? gridColorObj["isAttempted"]
                          : gridColorObj["isUnattempted"];
                  }
              })
            : [];
        return bgColor;
    };

    return (
        <div className={`page-margin h-screen overflow-auto pb-[90px]`}>
            <Center>
                <Text
                    t={`${
                        totalAttemptedQuestions < totalQuestions
                            ? `You have ${
                                  totalQuestions - totalAttemptedQuestions
                              } un-attempted questions left.`
                            : ""
                    } Are you sure you want to submit?`}
                    style="subtextRegular text-center pb-4 pt-[72px] text-dark-grey"
                />
                <Text t="List of Questions" style="smalltext !font-semibold" />
                <div className="w-[208px] mt-2 mb-1">
                    <ProgressBar
                        value={
                            quizDetails?.responses?.length
                                ? totalAttemptedQuestions
                                : 0
                        }
                        max={totalQuestions}
                        fillColor={getTailwindColor("primary-black", "#222222")}
                        bgColor={getTailwindColor("light-grey", "#E1E1E1")}
                    />
                </div>
                <Text
                    t={`${
                        quizDetails?.responses?.length
                            ? totalAttemptedQuestions
                            : 0
                    }/${totalQuestions} Completed`}
                    style="smalltext !font-normal"
                />
            </Center>
            {/* <div className="mt-4 grid grid-cols-12 gap-x-2 gap-y-3 grid-cols-1 grid-rows-none">
                {kohbeeQuiz?.sections[0]?.questions.length &&
                    kohbeeQuiz?.sections[0]?.questions?.map((id) => (
                        <ListViewQuestion key={id} questionId={id} />
                    ))}
            </div> */}
            <div className="box-border mt-5 grid grid-cols-12 gap-2 grid-rows-none">
                {kohbeeQuiz?.sections[0]?.questions.length &&
                    kohbeeQuiz?.sections[0]?.questions?.map(
                        (question, index: number) => (
                            <div
                                key={index}
                                className={`relative aspect-square p-2 ${getGridBgColor(
                                    question,
                                )} border border-transparent col-span-3 md:col-span-2 rounded flex grid cursor-pointer`}
                            >
                                {/* <BookmarkIcon
                                    variant="solid"
                                    className="absolute top-1 left-2"
                                /> */}

                                <div className="inline-block place-self-center">
                                    <Text
                                        t={`${index + 1}`}
                                        style="header text-center"
                                    />
                                </div>
                            </div>
                        ),
                    )}
            </div>

            <div
                className={`margin-x pb-6 pt-4 bg-pure-white grid grid-cols-12 gap-x-2 gap-y-3 grid-rows-1 fixed bottom-0 left-0 right-0`}
            >
                <Button
                    className={`col-start-1 col-end-7 !font-semibold !bg-pure-white !text-[#E85A71] !border-2 border-[#E85A71] hover:!bg-pure-white`}
                    onClick={() => handleSubmissionReviewPage(false)}
                >
                    No, Cancel
                </Button>

                <Button
                    className="col-start-7 col-end-13 !bg-[#4DB6AC] !font-semibold"
                    onClick={handleSubmitQuiz}
                    isLoading={loading}
                    loadingText={"Submitting"}
                >
                    Yes, Submit
                </Button>
            </div>
        </div>
    );
}

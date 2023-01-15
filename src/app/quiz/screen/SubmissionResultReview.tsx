/* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
import { Center } from "@components/center";
import { ProgressBar } from "@components/progress-bar";
import { Text } from "@components/text";
import {
    BackArrowIcon,
    BookmarkIcon,
    CheckCircleIcon,
    HourglassIcon,
    StarIcon,
    XmarkIcon,
} from "@library/icons";
import kohbeeQuizState from "@recoil/atoms/quiz";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "tailwind.config";
import kohbeeQuizResultState from "@recoil/atoms/quiz/quiz-result";
import { QuestionType } from "@components/question-type";
import { Latex } from "@components/latex";
import Image from "next/image";
import QuizVideoPlayer from "./components/QuizVideoPlayer";
import { getFormatedTimelimit, getWordLimit } from "../quiz-utils/common";

const twFullConfig = resolveConfig(tailwindConfig);

const getTailwindColor = (name: string, defaultValue: string) => {
    return twFullConfig.theme?.colors
        ? twFullConfig.theme?.colors[name]
        : defaultValue;
};
const initialState = {
    answers: ["1"],
    correctAnswers: ["1"],
    correctMark: 0,
    feedback: {
        id: "1",
        imageUrl: "",
        subtitle: "",
        title: "",
        videoUrl: "",
    },
    hasAttempted: true,
    hasEvaluated: true,
    hasTakenHint: false,
    imageUrl: "",
    isBookmarked: false,
    markAwarded: 5,
    negativeMark: 0,
    options: [
        {
            id: "1",
            imageUrl: "",
            subtitle: "",
            title: "",
            videoUrl: "",
        },
        {
            id: "2",
            imageUrl: "",
            subtitle: "",
            title: "",
            videoUrl: "",
        },
        {
            id: "3",
            imageUrl: "",
            subtitle: "",
            title: "",
            videoUrl: "",
        },
    ],
    questionId: "",
    questionTitle: "",
    questionType: "",
    subjectiveAnswer: "",
    timeLimit: 0,
    timeTaken: 0,
    videoUrl: "",
    wordLimit: null,
};
export function SubmissionResultReview({
    result,
    setReviewStage,
}): JSX.Element {
    const kohbeeQuiz = useRecoilValue(kohbeeQuizState);
    const kohbeeQuizResult = useRecoilValue(kohbeeQuizResultState);
    const [stage, setStage] = useState<number>(0);
    const [currentQuestion, setCurrentQuestion] =
        useState<typeof initialState>(initialState);

    const QuestionListItem = ({ question }): JSX.Element => {
        return (
            <div
                className={`p-3 bg-off-white col-start-1 col-end-13 rounded cursor-pointer `}
                onClick={() => {
                    setCurrentQuestion({ ...question });
                    setStage(1);
                }}
            >
                <div className="flex gap-1.5 items-start">
                    <div className="subtextRegular">
                        {question?.markAwarded == question?.correctMark ||
                        question?.markAwarded > 0 ? (
                            <CheckCircleIcon
                                color="#1D797E"
                                variant="outline"
                                className="mt-1"
                            />
                        ) : (
                            <XmarkIcon
                                variant="outline"
                                color="#E85A71"
                                className="mt-1"
                            />
                        )}
                    </div>
                    <Latex
                        t={
                            question?.questionTitle
                                ? question?.questionTitle
                                : ""
                        }
                        style="subtextSmall disable-text-selection"
                        maxLines={3}
                        showReadmoreButton={false}
                    />
                </div>
                <div className="flex justify-between pt-3">
                    <QuestionType type={question?.questionType} />
                    <Text
                        t={`${question?.markAwarded}/${
                            question?.correctMark || 0
                        } pts`}
                        style="smalltext"
                    />
                </div>
            </div>
        );
    };

    switch (stage) {
        case 1:
            return (
                <div
                    className={`page-margin h-screen overflow-auto pb-8 border border-transparent overflow-scroll`}
                >
                    <div className="margin-x bg-pure-white z-10 flex justify-start py-4 pt-[40px] fixed top-0 left-0 right-0">
                        <button onClick={() => setStage(0)}>
                            <div className="flex items-center gap-3">
                                <BackArrowIcon
                                    color="black"
                                    className="h-[1rem]"
                                />
                                <Text t="Exit" style="subtextRegular" />
                            </div>
                        </button>
                    </div>
                    <div className="w-full md:w-7/12 m-auto ">
                        <div className="pt-[70px] flex items-center justify-center gap-5 flex-wrap mb-3">
                            {/* TODO : time taken  */}

                            <div className="flex items-center gap-2 subtextRegular">
                                <HourglassIcon color="#4DB6AC" />
                                <Text
                                    t={`${
                                        currentQuestion?.timeLimit
                                            ? getFormatedTimelimit(
                                                  currentQuestion?.timeTaken,
                                              )
                                            : "No Limit"
                                    }`}
                                    style="subtextSmall text-[#4DB6AC]"
                                />
                            </div>

                            <div className="flex items-center gap-2 subtextRegular">
                                <StarIcon color="#E85A71" />
                                <div className="inline-flex">
                                    <Text
                                        t={`${currentQuestion?.markAwarded} pts`}
                                        style="subtextSmall text-[#4DB6AC]"
                                    />
                                </div>
                            </div>
                        </div>

                        {currentQuestion?.videoUrl !== null &&
                            currentQuestion?.videoUrl?.length > 0 && (
                                <QuizVideoPlayer
                                    videoUrl={currentQuestion.videoUrl}
                                />
                            )}

                        {!currentQuestion?.videoUrl &&
                            currentQuestion?.imageUrl && (
                                <div className="mt-1 mb-2 rounded-lg aspect-video overflow-hidden relative">
                                    <Image
                                        src={
                                            currentQuestion?.imageUrl ||
                                            "/images/quiz/questionImg.svg"
                                        }
                                        alt={`Question image`}
                                        layout="fill"
                                        objectFit="fill"
                                    />
                                </div>
                            )}
                        {/* Question title  */}
                        <div className="flex mt-2 flex-col gap-3">
                            <div className="w-full p-6 rounded bg-secondary-black flex justify-between gap-2">
                                <Latex
                                    t={currentQuestion?.questionTitle || ""}
                                    style="subtextRegular disable-text-selection"
                                />
                                {currentQuestion?.isBookmarked && (
                                    <div title={`Bookmark`}>
                                        <BookmarkIcon
                                            variant={
                                                currentQuestion?.isBookmarked
                                                    ? "solid"
                                                    : "outline"
                                            }
                                            color="white"
                                        />
                                    </div>
                                )}
                            </div>

                            {currentQuestion?.feedback?.title ||
                            currentQuestion?.feedback?.subtitle ||
                            currentQuestion?.feedback?.videoUrl ||
                            currentQuestion?.feedback?.imageUrl ? (
                                <div
                                    className={`w-full rounded border-2 border-[#4DB6AC] px-3 py-2`}
                                >
                                    {currentQuestion?.feedback?.videoUrl !==
                                        null &&
                                        currentQuestion?.feedback?.videoUrl
                                            ?.length > 0 && (
                                            <QuizVideoPlayer
                                                videoUrl={
                                                    currentQuestion?.feedback
                                                        ?.videoUrl
                                                }
                                            />
                                        )}
                                    {!currentQuestion?.feedback?.videoUrl &&
                                        currentQuestion?.feedback?.imageUrl && (
                                            <div className="m-auto  w-11/12 aspect-video rounded-lg relative">
                                                <Image
                                                    src={
                                                        currentQuestion
                                                            ?.feedback?.imageUrl
                                                    }
                                                    layout="fill"
                                                    objectFit="contain"
                                                />
                                            </div>
                                        )}
                                    {currentQuestion?.feedback?.title &&
                                        currentQuestion?.feedback?.title.trim()
                                            .length && (
                                            <div className="flex justify-start gap-3">
                                                <div>
                                                    <CheckCircleIcon
                                                        variant="solid"
                                                        color="#4DB6AC"
                                                        fontSize="20px"
                                                        className="mt-1"
                                                    />
                                                </div>
                                                <Latex
                                                    t={`${currentQuestion?.feedback?.title}`}
                                                    style="subtextSmall disable-text-selection"
                                                />
                                            </div>
                                        )}
                                </div>
                            ) : (
                                <></>
                            )}

                            {currentQuestion?.questionType ===
                            "MULTIPLECHOICE" ? (
                                <>
                                    {currentQuestion.options.length ? (
                                        currentQuestion.options.map(
                                            (
                                                option: typeof currentQuestion.options[0],
                                            ) => (
                                                <div
                                                    key={option.id}
                                                    className={`w-full rounded-lg ${
                                                        currentQuestion
                                                            ?.answers[0] ===
                                                        option.id
                                                            ? "border border-primary-black outline outline-1 outline-primary-black"
                                                            : ""
                                                    } ${
                                                        currentQuestion
                                                            ?.correctAnswers[0] ===
                                                        option.id
                                                            ? "bg-[#B8F2E3]"
                                                            : "bg-[#FB9797]"
                                                    }`}
                                                >
                                                    <label
                                                        htmlFor={option.id}
                                                        className={`py-6 px-3 flex justify-start items-center gap-2.5`}
                                                    >
                                                        <input
                                                            id={option.id}
                                                            type="radio"
                                                            name="options"
                                                            className={`primary-black checked:bg-primary-black checked:hover:bg-primary-black ${
                                                                currentQuestion
                                                                    ?.answers[0] ===
                                                                option.id
                                                                    ? "[#B8F2E3]"
                                                                    : "border-2 border-primary-black"
                                                            } bg-inherit`}
                                                            checked={
                                                                currentQuestion
                                                                    ?.answers[0] ===
                                                                option.id
                                                            }
                                                            disabled={true}
                                                        />
                                                        <Latex
                                                            t={
                                                                option?.title ||
                                                                ""
                                                            }
                                                            style={`${
                                                                currentQuestion
                                                                    ?.answers[0] ===
                                                                option.id
                                                                    ? "subtextRegular"
                                                                    : "paragraphRegular"
                                                            } disable-text-selection`}
                                                        />
                                                    </label>
                                                </div>
                                            ),
                                        )
                                    ) : (
                                        <></>
                                    )}
                                </>
                            ) : currentQuestion?.questionType ===
                              "MULTIPLESELECT" ? (
                                <>
                                    {currentQuestion.options.length ? (
                                        currentQuestion.options.map(
                                            (
                                                option: typeof currentQuestion.options[0],
                                            ) => (
                                                <div
                                                    key={option.id}
                                                    className={`w-full rounded-lg ${
                                                        currentQuestion?.answers?.includes(
                                                            option.id,
                                                        )
                                                            ? "border border-primary-black outline outline-1 outline-primary-black"
                                                            : ""
                                                    } ${
                                                        currentQuestion?.correctAnswers?.includes(
                                                            option.id,
                                                        )
                                                            ? "bg-[#B8F2E3]"
                                                            : "bg-[#FB9797]"
                                                    }`}
                                                >
                                                    <label
                                                        htmlFor={option.id}
                                                        className={`py-6 px-3 flex justify-start items-center gap-2.5`}
                                                    >
                                                        <input
                                                            id={option.id}
                                                            type="checkbox"
                                                            name="options"
                                                            className={`rounded checked:bg-primary-black checked:hover:bg-primary-black border-2 border-primary-black bg-inherit`}
                                                            checked={currentQuestion?.answers?.includes(
                                                                option.id,
                                                            )}
                                                            disabled={true}
                                                        />
                                                        <Latex
                                                            t={
                                                                option?.title ||
                                                                ""
                                                            }
                                                            style={`${
                                                                currentQuestion?.answers?.includes(
                                                                    option.id,
                                                                )
                                                                    ? "subtextRegular"
                                                                    : "paragraphRegular"
                                                            } disable-text-selection`}
                                                        />
                                                    </label>
                                                </div>
                                            ),
                                        )
                                    ) : (
                                        <></>
                                    )}
                                </>
                            ) : (
                                <div>
                                    <textarea
                                        rows={8}
                                        readOnly={true}
                                        disabled={true}
                                        value={currentQuestion.subjectiveAnswer}
                                        placeholder="Write your answer here..."
                                        className={`w-full h-auto py-2 px-3 rounded ring-transparent border-2 border-[#1D797E]`}
                                    ></textarea>
                                    {currentQuestion?.wordLimit && (
                                        <div>
                                            <Text
                                                t={`${getWordLimit(
                                                    currentQuestion.subjectiveAnswer,
                                                )}/${
                                                    currentQuestion?.wordLimit
                                                } Words`}
                                                style={`smalltext ml-3 !text-#0000008a`}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            );
        default:
            return (
                <div className={`page-margin h-screen pb-4`}>
                    <div className="margin-x bg-pure-white z-10 flex justify-start py-4 pt-[40px] fixed top-0 left-0 right-0">
                        <button onClick={() => setReviewStage(0)}>
                            <div className="flex items-center gap-3">
                                <BackArrowIcon
                                    color="black"
                                    className="h-[1rem]"
                                />
                                <Text t="Review Quiz" style="subtextRegular" />
                            </div>
                        </button>
                    </div>
                    <Center>
                        <Text
                            t={`You scored ${
                                kohbeeQuiz?.passingPercentage
                                    ? `${result.finalPercentage}% (${result.finalScore} points)`
                                    : `${result.finalScore} points`
                            }  on this quiz`}
                            style="subtextRegular text-center pb-4 pt-[72px] text-dark-grey"
                        />
                        <Text
                            t={`Total Score: ${result.finalScore}/${kohbeeQuiz.totalScore}`}
                            style="smalltext !font-semibold"
                        />
                        <div className="w-[208px] mt-2 mb-1">
                            <ProgressBar
                                value={
                                    kohbeeQuiz?.passingPercentage
                                        ? result.finalPercentage
                                        : result.finalScore
                                }
                                max={
                                    kohbeeQuiz?.passingPercentage
                                        ? 100
                                        : kohbeeQuiz.totalScore
                                }
                                fillColor={
                                    kohbeeQuiz?.passingPercentage
                                        ? `${
                                              result.finalPercentage >=
                                              result.passingPercentage
                                                  ? "#4DB6AC"
                                                  : "#E85A71"
                                          }`
                                        : getTailwindColor(
                                              "primary-black",
                                              "#222222",
                                          )
                                }
                                bgColor={getTailwindColor(
                                    "light-grey",
                                    "#E1E1E1",
                                )}
                            />
                        </div>
                    </Center>
                    <div className="mt-8 grid grid-cols-12 gap-x-2 gap-y-3 pb-4 grid-rows-none">
                        {kohbeeQuizResult?.sections?.length ? (
                            kohbeeQuizResult?.sections[0]?.responses?.map(
                                (question) => {
                                    return (
                                        <QuestionListItem
                                            key={question.questionId}
                                            question={question}
                                        />
                                    );
                                },
                            )
                        ) : (
                            <>
                                <div></div>
                            </>
                        )}
                    </div>
                </div>
            );
    }
}

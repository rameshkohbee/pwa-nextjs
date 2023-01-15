/* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ProgressBar } from "@components/progress-bar";
import { Text } from "@components/text";
import * as lodash from "lodash";

import {
    AngleIcon,
    BookmarkIcon,
    GridViewIcon,
    InfoIcon,
    ListViewIcon,
    PageViewIcon,
    UnfoldIcon,
} from "@library/icons";
import tailwindConfig from "tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig";
import { useRecoilState, useRecoilValue } from "recoil";
import { KohbeeQuiz } from "../models/kohbee-quiz";
import kohbeeQuizState from "@recoil/atoms/quiz";
import {
    getIsBookmarked,
    getQuestionType,
    getTotalAttemptedQuestions,
    getTotalQuestions,
} from "../quiz-utils/common";
import kohbeeQuizDetailsState from "@recoil/atoms/quiz/quiz-local";
import editorState from "@recoil/atoms/isEditor";
import ListViewQuestion from "./components/ListViewQuestion";
import { useDisclosure } from "@recoil/hooks/useDisclosure";

const twFullConfig = resolveConfig(tailwindConfig);

const getTailwindColor = (name: string, defaultValue: string) => {
    return twFullConfig.theme?.colors
        ? twFullConfig.theme?.colors[name]
        : defaultValue;
};

export function AssignmentDrawer({
    activeQuestion,
    handleActiveQuestion,
    question,
}): JSX.Element {
    const isReviewed = useRecoilValue(editorState);
    const closeTimer = useRef<any>();
    const [oneTime, setOneTime] = useState(0);
    const { isOpen, onClose, toggle } = useDisclosure();
    const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
    const [isOpenLegend, setIsOpenLegend] = useState<boolean>(true);
    const kohbeeQuiz = useRecoilValue<KohbeeQuiz>(kohbeeQuizState);
    const [quizDetails, setQuizDetails] = useRecoilState(
        kohbeeQuizDetailsState,
    );
    const activeQuestionRef = useRef<any>();
    const toggleDrawer = useCallback(() => {
        toggle();
        if (!isOpen && oneTime === 0) {
            clearInterval(closeTimer.current);
            closeTimer.current = setTimeout(() => {
                setIsOpenLegend(false);
                setOneTime(() => 1);
            }, 5000);
        }
    }, [isOpen]);

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

    const handleOpenLegend = () => {
        setIsOpenLegend((pre) => !pre);

        if (isOpenLegend || !isOpenLegend) {
            clearInterval(closeTimer.current);
            closeTimer.current = setTimeout(() => {
                setIsOpenLegend(false);
            }, 5000);
        }
    };

    const handleNavigation = (value: number, questionId: string) => {
        const data = lodash.cloneDeep(quizDetails);
        if (data?.responses) {
            const prevQuestion = data?.responses.filter(
                (question) => question.questionId === questionId,
            );
            if (!prevQuestion?.length) {
                const payload = {
                    questionId: questionId,
                    options: [],
                    answer: "",
                    hasTakenHint: false,
                    timeTaken: 0,
                    markAwarded: 0,
                    hasEvaluated: false,
                    isAttempted: false,
                    isInReview: false,
                    isBookmarked: false,
                };
                setQuizDetails({
                    ...data,
                    responses: [...data.responses, payload],
                });
            }
        }
        handleActiveQuestion(value);
    };

    const GetBookmark = ({
        questionId,
    }: {
        questionId: string;
    }): JSX.Element => {
        if (getIsBookmarked(quizDetails, questionId)) {
            return (
                <BookmarkIcon
                    variant="solid"
                    className="absolute top-2 left-2"
                    fontSize="12px"
                />
            );
        } else {
            return <></>;
        }
    };

    useEffect(() => {
        return () => {
            clearTimeout(closeTimer.current);
        };
    }, []);

    /**
     * @Info : Scroll active question at top automatically
     */
    useEffect(() => {
        if (isOpen) {
            activeQuestionRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }, [isOpen]);

    return (
        <div
            className={`fixed top-[calc(100%_-_80px)] md:top-[calc(100%_-_98px)] z-[1000] ${
                isOpen ? "!top-[19%]" : ""
            } bottom-0 left-0 right-0 shadow-[0px_-4px_8px_rgba(0,0,0,0.15)] bg-pure-white transition-all ease-in duration-200`}
        >
            {/* Header  */}
            <div
                className={`w-full relative margin-x pb-3 pt-4 grid grid-cols-12 gap-x-2 place-content-between gap-y-3 grid-rows-1`}
            >
                <div
                    className={`col-start-1 col-end-3 flex justify-start items-center ${
                        isOpen ? "!hidden" : ""
                    } transition-all ease-linear duration-200`}
                >
                    <button
                        className={`h-10 w-10 rounded-full flex justify-center items-center ${
                            activeQuestion === 0
                                ? "cursor-not-allowed"
                                : "cursor-pointer"
                        }`}
                        onClick={() =>
                            handleNavigation(activeQuestion - 1, question?.id)
                        }
                        disabled={activeQuestion === 0}
                    >
                        <AngleIcon
                            type="left"
                            color={activeQuestion === 0 ? "#E7E7E7" : "#111111"}
                        />
                    </button>
                </div>
                <div
                    className={`${
                        isOpen
                            ? "col-start-1 col-end-8 text-left"
                            : "col-start-3 col-end-11 text-center"
                    } transition-all ease-linear duration-200`}
                >
                    <div className="w-full">
                        <Text
                            t={
                                isOpen
                                    ? `List of Questions`
                                    : `Question ${activeQuestion + 1}: ${
                                          getQuestionType[
                                              question?.questionType
                                          ]
                                      }`
                            }
                            style={isOpen ? "subtextRegular" : "smalltext"}
                        />
                        <div
                            className={`w-full flex ${
                                isOpen ? "justify-start" : "justify-center"
                            }`}
                        >
                            <div className="w-11/12 mt-2 mb-1">
                                <ProgressBar
                                    value={
                                        quizDetails?.responses?.length
                                            ? getTotalAttemptedQuestions(
                                                  quizDetails,
                                              )
                                            : 0
                                    }
                                    max={getTotalQuestions(
                                        kohbeeQuiz?.sections || [],
                                    )}
                                    widthTransition="width 0.5s linear"
                                    fillColor={getTailwindColor(
                                        "secondary-black",
                                        "#222222",
                                    )}
                                    bgColor={getTailwindColor(
                                        "light-grey",
                                        "#E1E1E1",
                                    )}
                                />
                            </div>
                        </div>
                        <Text
                            t={`${
                                quizDetails?.responses?.length
                                    ? getTotalAttemptedQuestions(quizDetails)
                                    : 0
                            }/${getTotalQuestions(
                                kohbeeQuiz?.sections || [],
                            )} Attempted`}
                            style="smalltext !font-normal"
                        />
                    </div>
                </div>

                <div
                    className={`"col-start-8 col-end-9 text-center" ${
                        isOpen && viewMode === "grid" ? "block" : "hidden"
                    }`}
                >
                    <div className="h-full flex items-center">
                        <button
                            onClick={handleOpenLegend}
                            title="Legend"
                            className="h-fit rounded-full"
                        >
                            <InfoIcon
                                variant={isOpenLegend ? "solid" : "outline"}
                            />
                        </button>
                    </div>
                </div>

                {false && (
                    <div
                        className={`col-start-11 col-end-13 flex justify-between items-center ${
                            isOpen ? "" : "hidden"
                        } transition-all ease-linear duration-200`}
                    >
                        <div
                            className={`p-1 rounded cursor-pointer ${
                                viewMode === "list" ? "bg-light-grey" : ""
                            }`}
                            onClick={() => setViewMode("list")}
                        >
                            <ListViewIcon
                                color={
                                    viewMode == "list"
                                        ? getTailwindColor(
                                              "primary-black",
                                              "#111111",
                                          )
                                        : getTailwindColor(
                                              "dark-grey",
                                              "#555555",
                                          )
                                }
                            />
                        </div>
                        <div
                            className={`p-1 rounded cursor-pointer ${
                                viewMode === "grid" ? "bg-light-grey" : ""
                            }`}
                            onClick={() => setViewMode("grid")}
                        >
                            <GridViewIcon
                                color={
                                    viewMode === "grid"
                                        ? getTailwindColor(
                                              "primary-black",
                                              "#111111",
                                          )
                                        : getTailwindColor(
                                              "dark-grey",
                                              "#555555",
                                          )
                                }
                            />
                        </div>
                    </div>
                )}

                <div
                    className={`col-start-11 col-end-13 flex justify-end items-center visible ${
                        isOpen ? "!hidden" : ""
                    } transition-all ease-linear duration-200`}
                >
                    <button
                        className={`h-10 w-10 rounded-full flex justify-center items-center ${
                            activeQuestion ===
                            kohbeeQuiz?.sections[0]?.questions.length - 1
                                ? "cursor-not-allowed"
                                : "cursor-pointer"
                        }`}
                        disabled={
                            activeQuestion >=
                            kohbeeQuiz?.sections[0]?.questions.length - 1
                        }
                        onClick={() =>
                            handleNavigation(activeQuestion + 1, question?.id)
                        }
                    >
                        <AngleIcon
                            type="right"
                            color={
                                activeQuestion ===
                                kohbeeQuiz?.sections[0]?.questions.length - 1
                                    ? "#E7E7E7"
                                    : "#111111"
                            }
                        />
                    </button>
                </div>

                <div className="bg-pure-white absolute -top-3.5 left-[calc(50%_-_14px)] rounded-full shadow-[0px_-2px_4px_rgba(0,0,0,0.25)]">
                    <button
                        className="w-7 h-7 grid place-content-center rounded-full"
                        onClick={toggleDrawer}
                    >
                        <UnfoldIcon fontSize="14px" />
                    </button>
                </div>
            </div>

            {/* Body  */}
            <div className="box-border h-[calc(100%_-_80px)] md:h-[calc(100%_-_98px)] pb-4 border border-transparent overflow-scroll">
                <div
                    className={`margin-x ${
                        isOpenLegend && viewMode === "grid"
                            ? "block h-fit"
                            : "hidden h-0"
                    } transition-[height] ease-linear duration-300`}
                >
                    <div
                        className={`col-start-1 col-end-13 py-1 px-2 border border-black rounded`}
                    >
                        <Text t="Legend" style="subtextSmall text-center" />
                        {!isReviewed ? (
                            <div className="w-full flex justify-start mt-2">
                                <div className="w-1/3 md:w-1/6">
                                    <div className="w-3/4 m-auto aspect-square rounded bg-light-grey  border border-transparent"></div>
                                    <Text
                                        t="Unattempted"
                                        style="smalltext text-center"
                                    />
                                </div>
                                <div className="w-1/3 md:w-1/6">
                                    <div className="w-3/4 m-auto aspect-square rounded bg-[#76BBDF]  border border-transparent"></div>
                                    <Text
                                        t="Attempted"
                                        style="smalltext text-center"
                                    />
                                </div>
                                {/* We will add bookmark feature in quiz_v2 */}
                                {/* <div className="w-1/3 md:w-1/6">
                                    <div className="w-3/4 m-auto aspect-square border border-dotted border-black rounded">
                                        <BookmarkIcon
                                            variant="solid"
                                            className="m-2"
                                            fontSize="12px"
                                        />
                                    </div>
                                    <Text
                                        t="Marked for Later"
                                        style="smalltext text-center"
                                    />
                                </div> */}
                            </div>
                        ) : (
                            <div className="w-full flex justify-between mt-2">
                                <div className="w-1/3 md:w-1/6">
                                    <div className="w-3/4 m-auto aspect-square rounded bg-[#B8F2E3]  border border-transparent"></div>
                                    <Text
                                        t="Correct"
                                        style="smalltext text-center"
                                    />
                                </div>
                                <div className="w-1/3 md:w-1/6">
                                    <div className="w-3/4 m-auto aspect-square rounded bg-[#FB9797]  border border-transparent"></div>
                                    <Text
                                        t="Incorrect"
                                        style="smalltext text-center"
                                    />
                                </div>
                                <div className="w-1/3 md:w-1/6">
                                    <div className="w-3/4 m-auto aspect-square border border-dotted border-black rounded">
                                        <BookmarkIcon
                                            variant="solid"
                                            className="m-2"
                                            fontSize="12px"
                                        />
                                    </div>
                                    <Text
                                        t="Marked for Later"
                                        style="smalltext text-center"
                                    />
                                </div>
                                {false && (
                                    <div className="w-1/3 md:w-1/6">
                                        <div className="w-3/4 m-auto aspect-square border border-transparent rounded bg-[#FFF7DC]">
                                            <PageViewIcon className="m-2" />
                                        </div>
                                        <Text
                                            t="In Review"
                                            style="smalltext text-center"
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {viewMode === "grid" ? (
                    <div className="margin-x box-border mt-5 grid grid-cols-12 gap-2 grid-rows-none">
                        {kohbeeQuiz?.sections[0]?.questions.length &&
                            kohbeeQuiz?.sections[0]?.questions?.map(
                                (question, index: number) => (
                                    <div
                                        key={index}
                                        className={`relative aspect-square p-2 ${getGridBgColor(
                                            question,
                                        )} border border-transparent col-span-3 md:col-span-1 rounded flex grid cursor-pointer ${
                                            activeQuestion === index
                                                ? "outline outline-1 outline-black  outline-offset-2"
                                                : ""
                                        }`}
                                        onClick={() => {
                                            handleActiveQuestion(index);
                                            onClose();
                                        }}
                                        ref={(element) => {
                                            if (
                                                element &&
                                                activeQuestion === index
                                            ) {
                                                activeQuestionRef.current =
                                                    element;
                                            }
                                        }}
                                    >
                                        {false && (
                                            <GetBookmark
                                                questionId={question}
                                            />
                                        )}

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
                ) : (
                    <div className="margin-x box-border mt-5 grid grid-cols-12 gap-x-2 gap-y-3 grid-rows-none">
                        {kohbeeQuiz?.sections[0]?.questions.length &&
                            kohbeeQuiz?.sections[0]?.questions?.map(
                                (id, index) => (
                                    <ListViewQuestion
                                        key={id}
                                        activeQuestion={activeQuestion}
                                        questionId={id}
                                        outline={`${
                                            activeQuestion === index
                                                ? "outline outline-2 outline-primary-color  outline-offset-2"
                                                : ""
                                        }`}
                                        onClick={() => {
                                            handleActiveQuestion(index);
                                            onClose();
                                        }}
                                    />
                                ),
                            )}
                    </div>
                )}
            </div>
        </div>
    );
}

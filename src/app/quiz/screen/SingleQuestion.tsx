/* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Text } from "@components/text";
import {
    BookmarkIcon,
    CheckCircleIcon,
    HelpIcon,
    HourglassIcon,
    StarIcon,
} from "@library/icons";
import Image from "next/image";
import { ProgressBar } from "@components/progress-bar";
import autoSize from "autosize";
import { useRecoilState, useRecoilValue } from "recoil";
import kohbeeQuizState from "@recoil/atoms/quiz";
import { ThreeDots } from "react-loader-spinner";
import kohbeeQuizDetailsState from "@recoil/atoms/quiz/quiz-local";
import * as lodash from "lodash";
import QuizVideoPlayer from "./components/QuizVideoPlayer";
import { Latex } from "@components/latex";
import { Popover } from "@mui/material";
import { getFormatedTimelimit, getIsBookmarked } from "../quiz-utils/common";
import editorState from "@recoil/atoms/isEditor";

export function SingleQuestion({
    activeQuestion,
    handleActiveQuestion,
    question,
}): JSX.Element {
    const isReviewed = useRecoilValue(editorState);
    const kohbeeQuiz = useRecoilValue(kohbeeQuizState);
    const [quizDetails, setQuizDetails] = useRecoilState(
        kohbeeQuizDetailsState,
    );
    const [timeLimit, setTimeLimit] = useState<number>(
        question?.timeLimit || 0,
    );
    const questionTimeLimit = question?.timeLimit || 0;
    const [options, setOptions] = useState([]);
    const [fillColor, setFillColor] = useState<string>("var(--accent-color)");
    const timeLimitId = useRef<any>();
    const textAreaRef = useRef<any>();
    const [wordCount, setWordCount] = useState<number>(0);
    const [isAttempted, setIsAttempted] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
        null,
    );

    /**
     * @Info Used to handle onChange Event of MCQ(Multiple Choice Question) and updated QuizDetails
     * @param event {ChangeEvent}
     * @param questionId {string}
     * @param optionId {string}
     */
    const handleOnChangeMCQ = (
        event: ChangeEvent<HTMLInputElement>,
        questionId: string,
        optionId: string,
    ) => {
        const data = lodash.cloneDeep(quizDetails);
        if (data?.responses) {
            const prevQuestion = data?.responses.filter(
                (question) => question.questionId === questionId,
            );
            if (prevQuestion?.length) {
                const updatedData = data?.responses?.map((question) => {
                    if (question.questionId === questionId) {
                        question.options = [optionId];
                        question.timeTaken = questionTimeLimit
                            ? questionTimeLimit - timeLimit
                            : 0;
                        if (!question.isAttempted) {
                            question.isAttempted = true;
                        }
                    }
                    return question;
                });
                setQuizDetails({ ...data, responses: [...updatedData] });
            } else {
                const payload = {
                    questionId: questionId,
                    options: [optionId],
                    answer: "",
                    hasTakenHint: false,
                    timeTaken: questionTimeLimit
                        ? questionTimeLimit - timeLimit
                        : 0,
                    markAwarded: 0,
                    hasEvaluated: false,
                    isAttempted: true,
                    isInReview: false,
                    isBookmarked: false,
                };
                const updatedData = {
                    ...data,
                    responses: [...data.responses, payload],
                };
                setQuizDetails({ ...updatedData });
            }
        }
    };

    /**
     * @Info Used to clear the response of MCQs
     * @param questionId {string}
     * @return void
     */
    const handleClearResponse = (questionId: string) => {
        const data = lodash.cloneDeep(quizDetails);
        if (data?.responses) {
            const prevResponse = data?.responses.filter(
                (question) => question.questionId === questionId,
            );
            if (prevResponse?.length && prevResponse[0].isBookmarked) {
                const updatedData = data?.responses.map((question) => {
                    if (question.questionId === questionId) {
                        question.timeTaken = questionTimeLimit
                            ? questionTimeLimit - timeLimit
                            : 0;
                        question.options = [];
                        question.isAttempted = false;
                    }
                    return question;
                });
                setQuizDetails({ ...data, responses: [...updatedData] });
            } else {
                const updatedData = data?.responses.filter(
                    (question) => question.questionId !== questionId,
                );
                setQuizDetails({ ...data, responses: [...updatedData] });
            }
        }
    };

    /**
     * @Info Used to handle onChange Event of MSQ(Multiple Select Question) and updated QuizDetails
     * @param event {ChangeEvent}
     * @param questionId {string}
     * @param optionId {string}
     */
    const handleOnChangeMSQ = (
        event: ChangeEvent<HTMLInputElement>,
        questionId: string,
        optionId: string,
    ) => {
        const data = lodash.cloneDeep(quizDetails);
        if (data?.responses) {
            const prevQuestion = data?.responses.filter(
                (question) => question.questionId === questionId,
            );
            let isAllOptionBlank = false;
            let isBookmarked = false;
            if (prevQuestion?.length) {
                const updatedData = data?.responses?.map((question) => {
                    if (question.questionId === questionId) {
                        question.timeTaken = questionTimeLimit
                            ? questionTimeLimit - timeLimit
                            : 0;
                        if (!question.isAttempted) {
                            question.isAttempted = true;
                        }
                        if (question.isBookmarked) {
                            isBookmarked = true;
                        }
                        if (event.target.checked) {
                            const indexOfOption: number = question?.options
                                ? question?.options?.indexOf(optionId)
                                : -1;
                            question.options =
                                indexOfOption === -1
                                    ? question?.options
                                        ? [...question?.options, optionId]
                                        : question.options
                                    : question.options;
                        } else {
                            const indexOfOption: number = question?.options
                                ? question?.options?.indexOf(optionId)
                                : -1;
                            question.options =
                                indexOfOption === -1
                                    ? question?.options
                                    : question?.options
                                    ? question.options.filter(
                                          (option) => option != optionId,
                                      )
                                    : question.options;

                            if (question?.options?.length === 0) {
                                isAllOptionBlank = true;
                            }
                        }
                    }
                    return question;
                });
                if (isAllOptionBlank) {
                    if (isBookmarked) {
                        const updatedData2 = data?.responses.map((question) => {
                            if (question.questionId === questionId) {
                                question.options = [];
                                question.isAttempted = false;
                                question.timeTaken = questionTimeLimit
                                    ? questionTimeLimit - timeLimit
                                    : 0;
                            }
                            return question;
                        });
                        setQuizDetails({
                            ...data,
                            responses: [...updatedData2],
                        });
                    } else {
                        const updatedData3 = data?.responses.filter(
                            (question) => question.questionId !== questionId,
                        );
                        setQuizDetails({
                            ...data,
                            responses: [...updatedData3],
                        });
                    }
                } else {
                    setQuizDetails({ ...data, responses: [...updatedData] });
                }
            } else {
                const payload = {
                    questionId: questionId,
                    options: [optionId],
                    answer: "",
                    hasTakenHint: false,
                    timeTaken: questionTimeLimit
                        ? questionTimeLimit - timeLimit
                        : 0,
                    markAwarded: 0,
                    hasEvaluated: false,
                    isAttempted: true,
                    isInReview: false,
                    isBookmarked: false,
                };
                const updatedData = {
                    ...data,
                    responses: [...data.responses, payload],
                };
                setQuizDetails({ ...updatedData });
            }
        }
    };

    /**
     * @param questionId {string}
     * @param optionId {string}
     * @returns true/false depending on whether user has already selected option or not
     */
    const isOptionChecked = (questionId: string, optionId: string): boolean => {
        const isChecked = quizDetails?.responses?.length
            ? quizDetails?.responses?.filter((question) => {
                  if (
                      question?.questionId === questionId &&
                      question?.options?.includes(optionId)
                  )
                      return question;
              })
            : [];
        return isChecked?.length ? true : false;
    };

    const handleChangeAns = (
        event: ChangeEvent<HTMLTextAreaElement>,
        questionId: string,
    ) => {
        const { value } = event.target;
        const res: string[] = [];
        const tempValue = value;
        tempValue
            .replace(/[\t\n\r]/gm, " ")
            .split(" ")
            .map((word) => {
                const trimed = word.trim();
                if (trimed.length > 0) {
                    res.push(trimed);
                }
            });

        /**
         * @Info :  If we need to prevent user to type ans if word limit exceeded
         */
        /*
        if (res.length > question.wordLimit) {
            event.preventDefault();
            return;
        }
        */
        setWordCount(res.length);
        const data = lodash.cloneDeep(quizDetails);
        if (data?.responses) {
            const prevQuestion = data?.responses.filter(
                (question) => question.questionId === questionId,
            );
            if (prevQuestion?.length) {
                if (res?.length) {
                    const updatedData = data?.responses?.map((question) => {
                        if (question.questionId === questionId) {
                            question.timeTaken = questionTimeLimit
                                ? questionTimeLimit - timeLimit
                                : 0;
                            if (!question.isAttempted) {
                                question.isAttempted = true;
                            }

                            question.answer = value;
                        }
                        return question;
                    });
                    setQuizDetails({ ...data, responses: [...updatedData] });
                } else {
                    let isBookmarked = false;
                    data?.responses.forEach((question) => {
                        if (question.questionId === questionId) {
                            if (question.isBookmarked) {
                                isBookmarked = true;
                            }
                        }
                        return question;
                    });

                    if (isBookmarked) {
                        const updatedData2 = data?.responses.map((question) => {
                            if (question.questionId === questionId) {
                                question.answer = "";
                                question.isAttempted = false;
                                question.timeTaken = questionTimeLimit
                                    ? questionTimeLimit - timeLimit
                                    : 0;
                            }
                            return question;
                        });
                        setQuizDetails({
                            ...data,
                            responses: [...updatedData2],
                        });
                    } else {
                        const updatedData3 = data?.responses.filter(
                            (question) => question.questionId !== questionId,
                        );
                        setQuizDetails({
                            ...data,
                            responses: [...updatedData3],
                        });
                    }
                }
            } else {
                const payload = {
                    questionId: questionId,
                    options: [],
                    answer: value,
                    hasTakenHint: false,
                    timeTaken: questionTimeLimit
                        ? questionTimeLimit - timeLimit
                        : 0,
                    markAwarded: 0,
                    hasEvaluated: false,
                    isAttempted: true,
                    isInReview: false,
                    isBookmarked: false,
                };

                setQuizDetails({
                    ...data,
                    responses: [...data.responses, payload],
                });
            }
        }
    };

    const getWrittenAns = (
        questionId: string,
    ): string | number | readonly string[] | undefined => {
        let ans = "";
        quizDetails?.responses?.length
            ? quizDetails?.responses?.filter((question) => {
                  if (question?.questionId === questionId) {
                      ans = question?.answer ? question.answer : "";
                  }
              })
            : [];
        return ans;
    };

    const handleBookmark = (questionId: string) => {
        const data = lodash.cloneDeep(quizDetails);
        if (data?.responses) {
            const prevQuestion = data?.responses.filter(
                (question) => question.questionId === questionId,
            );
            if (prevQuestion?.length) {
                const updatedData = data?.responses?.map((question) => {
                    if (question.questionId === questionId) {
                        question.isBookmarked = !question?.isBookmarked;
                    }
                    return question;
                });
                setQuizDetails({ ...data, responses: [...updatedData] });
            } else {
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
                    isBookmarked: true,
                };

                setQuizDetails({
                    ...data,
                    responses: [...data.responses, payload],
                });
            }
        }
    };

    const Bookmark = (): JSX.Element => {
        return (
            <div title={`Bookmark`}>
                <button
                    disabled={isReviewed}
                    className=""
                    onClick={() => handleBookmark(question?.id)}
                >
                    <BookmarkIcon
                        variant={
                            getIsBookmarked(quizDetails, question?.id)
                                ? "solid"
                                : "outline"
                        }
                        color="white"
                    />
                </button>
            </div>
        );
    };
    const handleOpenHint = (
        event: React.MouseEvent<HTMLButtonElement>,
        questionId: string,
    ) => {
        setAnchorEl(event.currentTarget);
        const data = lodash.cloneDeep(quizDetails);
        if (data?.responses) {
            const prevQuestion = data?.responses.filter(
                (question) => question.questionId === questionId,
            );
            if (prevQuestion?.length) {
                const updatedData = data?.responses?.map((question) => {
                    if (
                        question.questionId === questionId &&
                        question.hasTakenHint === false
                    ) {
                        question.hasTakenHint = true;
                    }
                    return question;
                });
                setQuizDetails({ ...data, responses: [...updatedData] });
            } else {
                const payload = {
                    questionId: questionId,
                    options: [],
                    answer: "",
                    hasTakenHint: true,
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
    };
    const handleCloseHint = () => {
        setAnchorEl(null);
    };
    const openHint = Boolean(anchorEl);
    const hintId = openHint ? "simple-popover" : undefined;

    const handleNavigation = (value: number, questionId: string) => {
        setQuizDetails((prevData) => {
            const data = lodash.cloneDeep(prevData);
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
                        timeTaken: question?.timeLimit || 0,
                        markAwarded: 0,
                        hasEvaluated: false,
                        isAttempted: false,
                        isInReview: false,
                        isBookmarked: false,
                    };
                    return {
                        ...data,
                        responses: [...data.responses, payload],
                    };
                }
            }
            return data;
        });

        if (value !== activeQuestion) {
            handleActiveQuestion(value);
        }
        return true;
    };

    const startTimer = () => {
        setFillColor("var(--accent-color)");
        timeLimitId.current = setInterval(() => {
            setTimeLimit((pre: number) => {
                if (pre > 0) {
                    const maxTime = question?.timeLimit || 0;
                    if (pre == Math.floor(maxTime / 2)) {
                        setFillColor("#E03131");
                    }
                    return pre - 1;
                } else {
                    console.log("stop timer zero");
                    setIsAttempted(true);
                    stopTimer();

                    if (
                        !(
                            activeQuestion >=
                            kohbeeQuiz?.sections[0]?.questions.length - 1
                        )
                    ) {
                        handleNavigation(activeQuestion + 1, question?.id);
                        return 0;
                    }
                    if (
                        activeQuestion ==
                        kohbeeQuiz?.sections[0]?.questions.length - 1
                    ) {
                        handleNavigation(activeQuestion, question?.id);
                        return 0;
                    }
                    return 0;
                }
            });
        }, 1000);
    };

    const stopTimer = () => {
        clearInterval(timeLimitId.current);
        timeLimitId.current = null;
    };

    /*
    const reset = () => {
        clearInterval(timeLimitId.current);
        timeLimitId.current = null;
        setTimeLimit(question?.timeLimit || 0);
    };
    */

    const isNotAttempted = (questionId: string) => {
        if (quizDetails?.responses && quizDetails?.responses?.length > 0) {
            for (const question of quizDetails?.responses) {
                if (question.questionId === questionId) {
                    setIsAttempted(true);
                    return false;
                }
            }
            setIsAttempted(false);
            return true;
        } else {
            setIsAttempted(false);
            return true;
        }
    };

    useEffect(() => {
        if (!isReviewed) {
            if (question?.timeLimit && isNotAttempted(question?.id)) {
                (() => setTimeLimit(() => question?.timeLimit || 0))();
                startTimer();
            } else if (!question?.timeLimit) {
                setIsAttempted(false);
                stopTimer();
                setTimeLimit(0);
            } else {
                setIsAttempted(true);
                stopTimer();
                setTimeLimit(0);
            }
        } else {
            //TODO : what to show if it is review screen
            stopTimer();
            setTimeLimit(0);
        }
        return () => {
            clearInterval(timeLimitId.current);
            timeLimitId.current = null;
            setFillColor("var(--accent-color)");
        };
    }, [question?.id]);

    const getIsJumbled = (arr = [], isJumbled = false) => {
        if (isJumbled) {
            const jumbled = arr
                .map((value) => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value);

            return jumbled;
        } else {
            return arr;
        }
    };
    useEffect(() => {
        setOptions(getIsJumbled(question?.options, question?.isJumbled));
    }, [question?.id]);

    useEffect(() => {
        if (question?.questionType == "SUBJECTIVE") {
            autoSize(textAreaRef.current);
        }
    }, [textAreaRef, question?.questionType]);
    if (!question || !Object.keys(question).length) {
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

    return (
        <div className="w-full md:w-7/12 m-auto">
            <div className="pt-[70px] flex items-center justify-center gap-5 flex-wrap">
                <div className="flex items-center gap-2 subtextRegular">
                    <HourglassIcon
                        color="#4DB6AC"
                        className={`${
                            question?.timeLimit && timeLimit > 0
                                ? "animate-spin"
                                : ""
                        }`}
                    />
                    <Text
                        t={`${
                            question?.timeLimit
                                ? getFormatedTimelimit(timeLimit)
                                : "No Limit"
                        }`}
                        style="subtextSmall text-[#4DB6AC]"
                    />
                </div>
                <div className="flex items-center gap-2 subtextRegular">
                    <StarIcon color="#E85A71" />
                    <div className="inline-flex">
                        <Text
                            t={`+${question?.correctMark || 0}pts`}
                            style="subtextSmall text-[#4DB6AC]"
                        />

                        {question?.negativeMark ? (
                            <Text t={`/`} style="subtextSmall text-dark-grey" />
                        ) : (
                            ""
                        )}
                        {question?.negativeMark ? (
                            <Text
                                t={`-${question?.negativeMark || 0}pts`}
                                style="subtextSmall text-[#E85A71]"
                            />
                        ) : (
                            ""
                        )}
                    </div>
                </div>

                {question?.hint ? (
                    question.hint.length && (
                        <div title={`${question?.hint ? question.hint : ""}`}>
                            <button
                                aria-describedby={hintId}
                                className="flex items-center gap-2 subtextRegular"
                                disabled={isReviewed}
                                onClick={(event) =>
                                    handleOpenHint(event, question?.id)
                                }
                            >
                                <HelpIcon color="#555555" />
                                <Text
                                    t="Hint"
                                    style="subtextSmall text-dark-grey"
                                />
                            </button>
                            <Popover
                                id={hintId}
                                open={openHint}
                                anchorEl={anchorEl}
                                onClose={handleCloseHint}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "center",
                                }}
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "center",
                                }}
                            >
                                <div className="!bg-black">
                                    <Text
                                        t={`${
                                            question?.hint
                                                ? question.hint
                                                : "None"
                                        }`}
                                        style="subtextSmall py-2 px-3"
                                    />
                                </div>
                            </Popover>
                        </div>
                    )
                ) : (
                    <></>
                )}
            </div>
            <div
                className={`w-11/12 h-2 m-auto mt-2 ${
                    question?.timeLimit ? "visible" : "invisible"
                }`}
            >
                {!isReviewed ? (
                    question?.timeLimit && (
                        <ProgressBar
                            value={timeLimit}
                            max={question?.timeLimit || 0}
                            fillColor={fillColor}
                            bgColor={"#E1E1E1"}
                            widthTransition={
                                timeLimit > question?.timeLimit
                                    ? ""
                                    : "width 1s linear"
                            }
                        />
                    )
                ) : (
                    <></>
                )}
            </div>

            {question?.videoUrl !== null && question?.videoUrl?.length > 0 && (
                <QuizVideoPlayer videoUrl={question.videoUrl} />
            )}

            {!question?.videoUrl && question?.imageUrl && (
                <div className="mt-1 mb-2 rounded-lg aspect-video overflow-hidden relative">
                    <Image
                        src={
                            question?.imageUrl || "/images/quiz/questionImg.svg"
                        }
                        alt={`Question no ${activeQuestion}`}
                        layout="fill"
                        objectFit="fill"
                    />
                </div>
            )}
            {/* Question title  */}
            <div className="flex mt-2 flex-col gap-3 pb-5">
                <div className="w-full p-6 rounded bg-secondary-black flex justify-between gap-2">
                    <Latex
                        t={question?.title || ""}
                        style="subtextRegular disable-text-selection"
                    />
                    {false && <Bookmark />}
                </div>
                {isReviewed && (
                    <div
                        className={`w-full rounded border-2 border-[#4DB6AC] px-3 py-2`}
                    >
                        <div className="m-auto  w-11/12 aspect-video rounded-lg relative">
                            <Image
                                src={question?.imageUrl}
                                layout="fill"
                                objectFit="contain"
                            />
                        </div>
                        <div className="flex justify-between gap-3">
                            <div>
                                <CheckCircleIcon
                                    variant="solid"
                                    color="#4DB6AC"
                                    fontSize="20px"
                                    className="mt-1"
                                />
                            </div>
                            <Latex
                                t="Vīrabhadrasana is a series of yoga poses that embodies the mythic warrior Vīrabhadra. It’s a core posture — a lunging, standing asana that can help you build strength in your legs, spine, and torso. Warrior I is the OG pose, but there are several Warrior poses. You’ll find that many of the advanced variations also become regular features of your routines on your yoga journey, including Reverse Warrior (Viparita Virabhadrasana) and Humble Warrior (Baddha Virabhadrasana)."
                                style="subtextSmall disable-text-selection"
                            />
                        </div>
                    </div>
                )}
                {question?.questionType === "MULTIPLECHOICE" ? (
                    <>
                        {options.length &&
                            options.map((option: typeof question[0]) => (
                                <div
                                    key={option.id}
                                    className={`w-full rounded-lg ${
                                        isOptionChecked(
                                            question?.id || "",
                                            option?.id || "",
                                        )
                                            ? "border border-primary-black outline outline-1 outline-primary-black"
                                            : "border"
                                    } border-dark-grey`}
                                >
                                    <label
                                        htmlFor={option.id}
                                        className={`py-6 px-3 flex justify-start items-center gap-2.5 ${
                                            (question?.timeLimit &&
                                                isAttempted) ||
                                            isReviewed
                                                ? "cursor-not-allowed"
                                                : "cursor-pointer"
                                        }`}
                                    >
                                        <input
                                            id={option.id}
                                            type="radio"
                                            name="options"
                                            className={`primary-black checked:bg-primary-black checked:focus:bg-primary-black checked:hover:bg-primary-black  focus:ring-primary-black ${
                                                (question?.timeLimit &&
                                                    isAttempted) ||
                                                isReviewed
                                                    ? "cursor-not-allowed"
                                                    : "cursor-pointer"
                                            }`}
                                            onChange={(event) =>
                                                handleOnChangeMCQ(
                                                    event,
                                                    question.id,
                                                    option.id,
                                                )
                                            }
                                            checked={isOptionChecked(
                                                question?.id || "",
                                                option?.id || "",
                                            )}
                                            disabled={
                                                (question?.timeLimit &&
                                                    isAttempted) ||
                                                isReviewed
                                            }
                                        />
                                        <Latex
                                            t={option?.title || ""}
                                            style={`${
                                                isOptionChecked(
                                                    question?.id || "",
                                                    option?.id || "",
                                                )
                                                    ? "subtextRegular"
                                                    : "paragraphRegular"
                                            } disable-text-selection`}
                                        />
                                    </label>
                                </div>
                            ))}
                        {!isReviewed && !isAttempted ? (
                            <div className="w-full text-right">
                                <button
                                    onClick={() =>
                                        handleClearResponse(question?.id || "")
                                    }
                                    disabled={
                                        question?.timeLimit && isAttempted
                                    }
                                >
                                    <Text
                                        t={"Clear response"}
                                        style={`paragraphSmall ${
                                            question?.timeLimit && isAttempted
                                                ? "cursor-not-allowed"
                                                : "cursor-pointer"
                                        }`}
                                    />
                                </button>
                            </div>
                        ) : (
                            <></>
                        )}
                    </>
                ) : question?.questionType === "MULTIPLESELECT" ? (
                    options.length &&
                    options.map((option: typeof question[0]) => (
                        <div
                            key={option.id}
                            className={`w-full rounded-lg ${
                                isOptionChecked(
                                    question?.id || "",
                                    option?.id || "",
                                )
                                    ? "border border-primary-black outline outline-1 outline-primary-black"
                                    : "border"
                            } border-dark-grey`}
                        >
                            <label
                                htmlFor={option.id}
                                className={`py-6 px-3 flex justify-start items-center gap-2.5 ${
                                    (question?.timeLimit && isAttempted) ||
                                    isReviewed
                                        ? "cursor-not-allowed"
                                        : "cursor-pointer"
                                }`}
                            >
                                <input
                                    id={option.id}
                                    type="checkbox"
                                    name="options"
                                    className={`rounded checked:bg-primary-black checked:focus:bg-primary-black checked:hover:bg-primary-black primary-black focus:ring-primary-black ${
                                        (question?.timeLimit && isAttempted) ||
                                        isReviewed
                                            ? "cursor-not-allowed"
                                            : "cursor-pointer"
                                    }`}
                                    onChange={(event) =>
                                        handleOnChangeMSQ(
                                            event,
                                            question.id,
                                            option.id,
                                        )
                                    }
                                    checked={isOptionChecked(
                                        question?.id || "",
                                        option?.id || "",
                                    )}
                                    disabled={
                                        (question?.timeLimit && isAttempted) ||
                                        isReviewed
                                    }
                                />
                                <Latex
                                    t={option?.title || ""}
                                    style={`${
                                        isOptionChecked(
                                            question?.id || "",
                                            option?.id || "",
                                        )
                                            ? "subtextRegular"
                                            : "paragraphRegular"
                                    } disable-text-selection`}
                                />
                            </label>
                        </div>
                    ))
                ) : (
                    <div>
                        <textarea
                            ref={(ele) => {
                                if (ele) {
                                    textAreaRef.current = ele;
                                }
                            }}
                            readOnly={
                                (question?.timeLimit && isAttempted) ||
                                isReviewed
                            }
                            onPaste={(e) => {
                                e.preventDefault();
                                return false;
                            }}
                            onCopy={(e) => {
                                e.preventDefault();
                                return false;
                            }}
                            value={getWrittenAns(question?.id || "")}
                            onChange={(event) =>
                                handleChangeAns(event, question?.id || "")
                            }
                            placeholder="Write your answer here..."
                            className={`w-full h-auto py-2 px-3 rounded border-2 border-[#1D797E] focus:ring-transparent focus:border-[#1D797E] ${
                                (question?.timeLimit && isAttempted) ||
                                isReviewed
                                    ? "cursor-not-allowed"
                                    : ""
                            }`}
                        ></textarea>
                        {question?.wordLimit && (
                            <div>
                                <Text
                                    t={`${wordCount}/${
                                        question?.wordLimit
                                    } Words${
                                        wordCount >= question?.wordLimit
                                            ? ", You have exceeded max word limit"
                                            : ""
                                    }`}
                                    style={`smalltext ml-3 ${
                                        wordCount >= question?.wordLimit
                                            ? "!text-[#E03131]"
                                            : "!text-#0000008a"
                                    }`}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

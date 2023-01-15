/* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
import React, { useCallback, useEffect, useState } from "react";
import { Text } from "@components/text";
import { BackArrowIcon } from "@library/icons";
import { AssignmentDrawer } from "./AssignmentDrawer";
import { SingleQuestion } from "./SingleQuestion";
import { useRecoilState, useRecoilValue } from "recoil";
import { KohbeeQuiz } from "../models/kohbee-quiz";
import kohbeeQuizState from "@recoil/atoms/quiz";
import kohbeeAllQuizQuestionsState from "@recoil/atoms/quiz/all-questions";
import { getQuestion } from "../services/get-question";
import kohbeeQuizQuestionState from "@recoil/atoms/quiz/question";
import { ThreeDots } from "react-loader-spinner";
import { SubmissionReview } from "./SubmissionReview";

export function AssignmentQuestions({ handleSetStage }): JSX.Element {
    const kohbeeQuiz = useRecoilValue<KohbeeQuiz>(kohbeeQuizState);
    const [AllQuestions, setAllQuestions] = useRecoilState(
        kohbeeAllQuizQuestionsState,
    );
    const [QuizQuestion, setQuizQuestion] = useRecoilState(
        kohbeeQuizQuestionState,
    );
    const [pageLoading, setPageLoading] = useState<boolean>(false);
    const [isSubmissionReview, setIsSubmissionReview] =
        useState<boolean>(false);
    const [activeQuestion, setActiveQuestion] = useState<number>(0);

    const handleActiveQuestion = useCallback(
        (value: number) => {
            setActiveQuestion(() => value);
        },
        [activeQuestion],
    );
    const getActiveQuetionById = async (questionId: string) => {
        setPageLoading(true);
        if (AllQuestions?.length) {
            const questions = AllQuestions?.filter(
                (question) => question.id === questionId,
            );
            if (questions?.length) {
                setQuizQuestion({ ...questions[0] });
                setPageLoading(false);
                return true;
            }
        }
        const question = await getQuestion(questionId);

        if (question != undefined) {
            setQuizQuestion({ ...question });
            setAllQuestions([...AllQuestions, question]);
        } else {
            console.log("Something went wrong");
            // TODO:  what happen if we not able to get question by id ?
        }
        setPageLoading(false);
    };
    const handleSubmissionReviewPage = useCallback(
        (value: boolean) => {
            setIsSubmissionReview(value);
        },
        [isSubmissionReview],
    );

    useEffect(() => {
        getActiveQuetionById(kohbeeQuiz.sections[0].questions[activeQuestion]);
    }, [activeQuestion]);

    return (
        <>
            {isSubmissionReview ? (
                <SubmissionReview
                    handleSubmissionReviewPage={handleSubmissionReviewPage}
                    handleSetStage={handleSetStage}
                />
            ) : (
                <div
                    className={`page-margin h-screen overflow-auto pb-[90px] md:pb-[110px] border border-transparent overflow-scroll`}
                >
                    <div className="margin-x bg-pure-white z-10 flex justify-between py-4 pt-[40px] fixed top-0 left-0 right-0">
                        <button onClick={() => handleSetStage(1)}>
                            <div className="flex items-center gap-3">
                                <BackArrowIcon
                                    color="black"
                                    className="h-[1rem]"
                                />
                                <Text t="Exit" style="subtextRegular" />
                            </div>
                        </button>
                        <div>
                            <button
                                onClick={() => handleSubmissionReviewPage(true)}
                            >
                                <Text
                                    t="submit"
                                    style="subtextSmall uppercase !text-primary-color"
                                />
                            </button>
                        </div>
                    </div>
                    {pageLoading ? (
                        <div className="grid h-screen place-items-center bg-color">
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
                    ) : (
                        <SingleQuestion
                            activeQuestion={activeQuestion}
                            handleActiveQuestion={handleActiveQuestion}
                            question={QuizQuestion}
                        />
                    )}

                    <AssignmentDrawer
                        activeQuestion={activeQuestion}
                        handleActiveQuestion={handleActiveQuestion}
                        question={QuizQuestion}
                    />
                </div>
            )}
        </>
    );
}

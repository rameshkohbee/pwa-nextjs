import { Latex } from "@components/latex";
import { QuestionType } from "@components/question-type";
import { Text } from "@components/text";
import { CheckCircleIcon, WarningIcon } from "@library/icons";
import kohbeeAllQuizQuestionsState from "@recoil/atoms/quiz/all-questions";
import kohbeeQuizDetailsState from "@recoil/atoms/quiz/quiz-local";
import { memo, MouseEventHandler, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { KohbeeQuizQuestion } from "../../models/kohbee-question";

const ListViewQuestion = ({
    questionId,
    onClick,
    activeQuestion,
    outline = "",
}: {
    questionId: string;
    onClick?: MouseEventHandler<HTMLDivElement>;
    activeQuestion?: number;
    outline?: string;
}) => {
    const AllQuestions = useRecoilValue(kohbeeAllQuizQuestionsState);
    const quizDetails = useRecoilValue(kohbeeQuizDetailsState);
    const [question, setQuestion] = useState<KohbeeQuizQuestion>({});

    const getIsAttempted = (questionId: string) => {
        let isAttempted = false;
        quizDetails?.responses?.length
            ? quizDetails?.responses?.filter((question) => {
                  if (question?.questionId === questionId) {
                      isAttempted = question?.isAttempted ? true : false;
                  }
              })
            : [];

        return isAttempted;
    };

    useEffect(() => {
        if (questionId) {
            if (AllQuestions?.length) {
                const questions = AllQuestions?.filter(
                    (question) => question.id === questionId,
                );
                if (questions?.length) {
                    setQuestion({ ...questions[0] });
                }
            }
        }
    }, [questionId, activeQuestion]);
    return (
        <div
            className={`p-3 bg-off-white col-start-1 col-end-13 rounded cursor-pointer ${outline}`}
            onClick={onClick}
        >
            <div className="flex gap-1 items-center">
                <div>
                    {getIsAttempted(questionId) ? (
                        <CheckCircleIcon color="#1D797E" variant="outline" />
                    ) : (
                        <WarningIcon color="#FF8066" />
                    )}
                </div>
                <Latex
                    t={question?.title ? question?.title : ""}
                    style="subtextSmall disable-text-selection"
                    maxLines={3}
                    showReadmoreButton={false}
                />
            </div>
            <div className="flex justify-between pt-2">
                <QuestionType type={question?.questionType} />
                <Text t={`${question?.correctMark || 0}`} style="smalltext" />
            </div>
        </div>
    );
};

export default memo(ListViewQuestion);

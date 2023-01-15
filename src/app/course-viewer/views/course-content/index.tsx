import { Button, Text } from "@components";
import { curriculumState, lessonsState } from "@recoil/atoms";
import courseNavigatorState from "@recoil/atoms/course-navigator";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useRecoilValue, useSetRecoilState } from "recoil";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { useWindowSize } from "react-use";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { getQuiz } from "src/app/quiz/services/get-quiz";
import kohbeeQuizState from "@recoil/atoms/quiz";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PdfViewer = dynamic(() => import("@components/pdf-viewer"), {
    ssr: false,
});

function CourseContent(): JSX.Element {
    const courseNavigator = useRecoilValue(courseNavigatorState);
    const curriculum = useRecoilValue(curriculumState);
    const lessons = useRecoilValue(lessonsState);
    const [lessonName, setLessonName] = useState("");
    const { width } = useWindowSize();
    const router = useRouter();
    const setKohbeeQuiz = useSetRecoilState(kohbeeQuizState);

    if (curriculum.sections == undefined) {
        return <div></div>;
    }

    function getLessonContent() {
        const lessonId =
            curriculum.sections[courseNavigator[0]].lessons[courseNavigator[1]]
                .contentId;
        const lessonType =
            curriculum.sections[courseNavigator[0]].lessons[courseNavigator[1]]
                .contentType;
        const currentLessonIndex = lessons.findIndex((lesson) => {
            return lesson.id == lessonId;
        });

        let lessonContent = (
            <Text
                t={"Oops! Lesson Content Not Found"}
                style="subtextRegular"
            ></Text>
        );

        if (
            currentLessonIndex !== -1 &&
            lessons[currentLessonIndex] !== null &&
            lessons[currentLessonIndex].uri !== undefined
        ) {
            const currentLesson = lessons[currentLessonIndex];
            switch (currentLesson.contentType) {
                case "video":
                    lessonContent = (
                        <ReactPlayer
                            controls
                            url={currentLesson.uri}
                            height={width <= 768 ? width * 0.9 * (9 / 16) : 400}
                            width={width <= 768 ? width * 0.9 : 900}
                        />
                    );
                    break;
                case "pdf":
                    lessonContent = (
                        <PdfViewer
                            pdfUrl={currentLesson.uri}
                            style="h-[calc(100vh-124px)] md:h-[calc(100vh-90px)] w-full flex-1"
                        />
                    );
                    break;
                case "text":
                    lessonContent = (
                        <ReactMarkdown>
                            {currentLesson.text ?? ""}
                        </ReactMarkdown>
                    );
                    break;
                case "link":
                    lessonContent = currentLesson.uri.includes(
                        "drive.google",
                    ) ? (
                        <iframe
                            src={currentLesson.uri}
                            width={width <= 768 ? width * 0.9 : 900}
                            height={width <= 768 ? width * 0.9 * (16 / 9) : 700}
                            allow="autoplay"
                        ></iframe>
                    ) : currentLesson.uri.includes("youtu") ? (
                        <ReactPlayer
                            controls
                            url={currentLesson.uri}
                            height={width <= 768 ? width * 0.9 * (9 / 16) : 400}
                            width={width <= 768 ? width * 0.9 : 900}
                        />
                    ) : (
                        <a
                            className="text-white font-weight-bold text-2xl"
                            target="_blank"
                            href={currentLesson.uri}
                        >
                            {currentLesson.uri}
                        </a>
                    );
                    break;
                case "image":
                    <Image src={currentLesson.uri}></Image>;
                    break;
            }
        } else if (currentLessonIndex === -1 && lessonType === "quiz") {
            lessonContent = (
                <div>
                    <Button
                        cardButton={true}
                        onClick={() => fetchQuiz(lessonId)}
                    >
                        <Text t="Start Test" style="subtextRegular" />
                    </Button>
                </div>
            );
        }

        return lessonContent;
    }

    async function fetchQuiz(quizId: string) {
        const quizData = await getQuiz(quizId);
        if (quizData != undefined && quizData?.creatorId) {
            setKohbeeQuiz({
                ...quizData,
            });
            router.push(`/quiz?id=${router?.query?.offeringId}`);
        } else {
            toast.error("Error occurred while fetching quiz details");
            console.log("Error occurred while fetching quiz details");
        }
    }

    useEffect(() => {
        setLessonName(
            curriculum.sections[courseNavigator[0]].lessons[courseNavigator[1]]
                .title,
        );
    }, [courseNavigator]);

    return (
        <div className="flex flex-col md:border-l md:h-screen overflow-y-auto">
            <div className="mx-4 my-4">
                <div className="flex flex-row items-center mb-6">
                    {width <= 768 && (
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            className="mr-4"
                            size="lg"
                            style={{ color: "var(--txt-color)" }}
                            onClick={() => {
                                router.back();
                            }}
                        />
                    )}
                    <Text t={lessonName} style="headerSmall"></Text>
                </div>
                <div className="flex flex-col justify-center items-center">
                    {getLessonContent()}
                </div>
                <ToastContainer
                    position="bottom-center"
                    autoClose={2000}
                    theme="dark"
                    limit={2}
                />
            </div>
        </div>
    );
}

export default CourseContent;

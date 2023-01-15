import { Text } from "@components/text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { courseState, curriculumState } from "@recoil/atoms";
import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import courseNavigatorState from "@recoil/atoms/course-navigator";
import { useWindowSize } from "react-use";
import { useRouter } from "next/router";
import { useRouterParams } from "@recoil/hooks/useRouterParams";

function CourseNavigator(): JSX.Element {
    const curriculum = useRecoilValue(curriculumState);
    const setCourseNavigator = useSetRecoilState(courseNavigatorState);
    const course = useRecoilValue(courseState);
    const [selectedSection, setSelectedSection] = useState(0);
    const [show, setShow] = useState(false);
    const { width } = useWindowSize();
    const router = useRouter();
    const { getParamValue } = useRouterParams();

    useEffect(() => {
        if (curriculum?.sections?.length === 1 && !show) {
            setShow(true);
        }
    }, []);

    function LessonIcon({ type }: { type: string }) {
        let iconUrl = "";
        switch (type) {
            case "video":
                iconUrl = "/icons/video-icon.svg";
                break;
            case "link":
                iconUrl = "/icons/link-icon.svg";
                break;
            case "image":
                iconUrl = "/icons/image-icon.svg";
                break;
            case "text":
                iconUrl = "/icons/text-icon.svg";
                break;
            case "pdf":
                iconUrl = "/icons/pdf-icon.svg";
                break;
            case "quiz":
                iconUrl = "/icons/quiz-icon.svg";
                break;
        }
        return (
            <div className="grid place-content-center w-[24px] h-[24px]">
                <Image src={iconUrl} height="24px" width="24px"></Image>
            </div>
        );
    }

    if (curriculum.sections === undefined) {
        return <div></div>;
    }

    return (
        <div className="h-screen overflow-y-auto">
            <div className="p-4 flex flex-row items-center border-b">
                <FontAwesomeIcon
                    icon={faArrowLeft}
                    className="mr-4"
                    size="lg"
                    style={{ color: "var(--txt-color)" }}
                    onClick={() => {
                        router.back();
                    }}
                />
                <Text t={course.courseName} style="headerSmall"></Text>
            </div>
            <div className="">
                <Text
                    t={"Chapters & Resources"}
                    style="headerSmall text-center p-4"
                ></Text>
                <div className="flex flex-col gap-4 p-4">
                    {curriculum.sections.map((section, sectionIndex) => {
                        return (
                            <div
                                className="py-4 px-6 rounded-2xl  bg-card-block-color drop-shadow-md"
                                key={sectionIndex}
                            >
                                <div
                                    className="flex items-center gap-2"
                                    onClick={() => {
                                        setSelectedSection(sectionIndex);
                                        setShow(!show);
                                    }}
                                >
                                    <div className="flex-auto cursor-pointer">
                                        <Text
                                            t={section.title}
                                            style="subtextRegular"
                                        ></Text>
                                        <Text
                                            t={section.subtitle}
                                            maxLines={3}
                                            style="paragraphSmall"
                                        ></Text>
                                    </div>
                                    <div>
                                        <div
                                            style={{
                                                transform:
                                                    show === true &&
                                                    selectedSection ===
                                                        sectionIndex
                                                        ? "rotate(180deg)"
                                                        : "rotate(0deg)",
                                                transition: "0.3s",
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faChevronDown}
                                                style={{
                                                    color: "var(--primary-color)",
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {show === true &&
                                selectedSection === sectionIndex ? (
                                    <div className="mt-2">
                                        {section.lessons.map(
                                            (lesson, lessonIndex) => {
                                                return (
                                                    <div
                                                        className="mb-3 px-2 py-1 rounded-md bg-descriptive-block-color drop-shadow cursor-pointer"
                                                        key={lessonIndex}
                                                        onClick={async () => {
                                                            setCourseNavigator([
                                                                sectionIndex,
                                                                lessonIndex,
                                                            ]);

                                                            if (width <= 768) {
                                                                const offeringId =
                                                                    getParamValue(
                                                                        "offeringId",
                                                                    )?.toString() ??
                                                                    "";
                                                                router.push(
                                                                    offeringId.length >
                                                                        0
                                                                        ? `course-content?offeringId=${offeringId}`
                                                                        : `course-content`,
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        <div className="flex flex-row items-center">
                                                            <div className="p-2">
                                                                <LessonIcon
                                                                    type={
                                                                        lesson.contentType
                                                                    }
                                                                ></LessonIcon>
                                                            </div>

                                                            <div className="ml-2">
                                                                <Text
                                                                    t={
                                                                        lesson.title
                                                                    }
                                                                    style="subtextSmall"
                                                                ></Text>
                                                                <Text
                                                                    t={
                                                                        lesson.subtitle
                                                                    }
                                                                    style="paragraphSmall"
                                                                    maxLines={2}
                                                                ></Text>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            },
                                        )}
                                    </div>
                                ) : null}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default CourseNavigator;
